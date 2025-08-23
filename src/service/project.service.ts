import { ILogger, Logger, Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Brackets, FindOptionsOrder, Like, Not, Repository } from 'typeorm';
import { Project } from '../entity/project.entity';
import { Stage } from '../entity/stage.entity';
import { Node } from '../entity/node.entity';
import { Procedure } from '../entity/procedure.entity';
import { Company } from '../entity/company.entity';
import { Context } from '@midwayjs/koa';
import * as path from 'path';
import * as fs from 'fs';
import { parse } from 'fast-csv';
import * as ExcelJS from 'exceljs';

@Provide()
export class ProjectService {
  @InjectEntityModel(Project)
  projectRepository: Repository<Project>;
  @InjectEntityModel(Stage)
  stageRepository: Repository<Stage>;
  @InjectEntityModel(Node)
  nodeRepository: Repository<Node>;
  @InjectEntityModel(Procedure)
  procedureRepository: Repository<Procedure>;
  @InjectEntityModel(Company)
  companyRepository: Repository<Company>;

  @Logger('project')
  logger: ILogger;

  async page(
    params:
      | {
          projCode: string;
          year: string;
          name: string;
          type: string;
          stage: number;
          status: number;
          companyId: number;
          page: number;
          size: number;
          sortField: string;
          sortDir: string;
        }
      | any
  ) {
    console.log('params', params);

    const where = {};
    params.projCode && (where['projCode'] = Like(`%${params.projCode}%`));
    params.year && (where['year'] = params.year);
    params.name && (where['name'] = Like(`%${params.name}%`));
    params.type && (where['type'] = params.type);
    params.stage && (where['stage'] = params.stage);
    params.status && (where['status'] = params.status);
    params.companyId && (where['companyId'] = params.companyId);

    const count = await this.projectRepository.countBy(where);
    if (!count || count < 1) {
      return { total: count };
    }

    const page = params.page || 1;
    const size = params.size || 10;
    const skip = (page - 1) * size;

    const order: FindOptionsOrder<Project> = params.sortField
      ? { [params.sortField]: params.sortDir || 'ASC' }
      : null;
    return {
      total: count,
      data: await this.projectRepository.find({
        where,
        order,
        skip,
        take: size,
        relations: ['company', 'stages', 'stages.nodes'],
      }),
    };
  }

  async pageV2(
    params:
      | {
          projCode: string;
          year: string;
          name: string;
          type: string;
          delayed: boolean;
          stage: number;
          status: number;
          companyId: number;
          page: number;
          size: number;
          sortField: string;
          sortDir: string;
        }
      | any
  ) {
    const projIds = await this.getProjByState(params.delayed);
    if (projIds !== null && projIds.length == 0) {
      return { total: 0 };
    }

    const page = params.page || 1;
    const size = params.size || 10;
    const skip = (page - 1) * size;

    const sortField = params.sortField || 'project.id';
    const sortDir = params.sortDir || 'ASC';

    const [contents, total] = await this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.company', 'company')
      .leftJoinAndSelect('project.stages', 'stages')
      .leftJoinAndSelect('stages.nodes', 'node')
      .where(
        new Brackets(qb => {
          params.projCode &&
            qb.where('project.projCode LIKE :projCode', {
              projCode: `%${params.projCode}%`,
            });
          params.year &&
            qb.andWhere('project.year = :year', { year: params.year });
          params.name &&
            qb.andWhere('project.name LIKE :name', {
              name: `%${params.name}%`,
            });
          params.type &&
            qb.andWhere('project.type = :type', { type: params.type });
          params.stage &&
            qb.andWhere('project.stage = :stage', { stage: params.stage });
          params.status &&
            qb.andWhere('project.status = :status', { status: params.status });
          params.companyId &&
            qb.andWhere('project.companyId = :companyId', {
              companyId: params.companyId,
            });
          if (projIds !== null && projIds.length > 0) {
            if (params.delayed === 'true') {
              qb.andWhere('project.id IN (:...projIds)', { projIds });
            } else {
              qb.andWhere('project.id NOT IN (:...projIds)', { projIds });
            }
          }
        })
      )
      .orderBy(sortField, sortDir)
      .skip(skip)
      .take(size)
      .getManyAndCount();

    return { total, data: contents };
  }

  async handleImport(file) {
    const ext = path.extname(file.filename).toLowerCase();

    if (ext === '.csv') {
      await this.parseCSV(file.data);
    } else if (ext === '.xlsx') {
      await this.parseExcel(file.data);
    } else {
      throw new Error('只支持 CSV 或 Excel 文件');
    }
  }

  private parseCSV(filePath: string) {
    return new Promise((resolve, reject) => {
      let rowCount = 0;
      const results = [];

      fs.createReadStream(filePath)
        .pipe(parse({ headers: true }))
        .on('error', reject)
        .on('data', row => {
          rowCount++;
          results.push(row);

          if (results.length >= 1000) {
            this.logger.info(`写入第 ${rowCount} 行...`);
            // TODO: 批量写数据库
            results.length = 0;
          }
        })
        .on('end', () => {
          this.logger.info(`CSV 解析完成，共 ${rowCount} 行`);
          resolve(rowCount);
        });
    });
  }
  private async parseExcel(filePath: string) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);

    let rowCount = 0;
    const batch = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // 跳过表头

      const rowData = {
        col1: row.getCell(1).value,
        col2: row.getCell(2).value,
        col3: row.getCell(3).value,
      };

      batch.push(rowData);
      rowCount++;

      if (batch.length >= 1000) {
        this.logger.info(`写入第 ${rowCount} 行...`);
        // TODO: 批量写数据库
        batch.length = 0;
      }
    });

    this.logger.info(`Excel 解析完成，共 ${rowCount} 行`);
  }


  private async getProjByState(
    delayed: boolean | null
  ): Promise<number[] | null> {
    let projIds = null;
    if (delayed) {
      const nodes = await this.nodeRepository
        .createQueryBuilder('node')
        .leftJoinAndSelect('node.stage', 'stage')
        .leftJoinAndSelect('stage.project', 'project')
        .where(
          new Brackets(qb => {
            qb.andWhere(
              new Brackets(qb => {
                qb.where('node.actualStart IS NOT NULL')
                  .andWhere('node.actualEnd IS NULL')
                  .andWhere("node.plannedEnd <= 'datetime(now)'");
              })
            );
          })
        )
        .getMany();

      nodes && (projIds = nodes.map(n => n.stage.project.id));
    }
    return projIds;
  }

  async create(project: Project) {
    if (!project) {
      this.logger.error('project is null');
      return { success: false, data: {}, message: 'project is null' };
    }

    const exist = await this.projectRepository.find({
      where: [{ name: project.name }, { projCode: project.projCode }],
      take: 1,
    });
    if (exist && exist.length > 0) {
      if (exist[0].name === project.name) {
        return {
          success: false,
          message: `项目名称：${project.name}已存在`,
          data: exist,
        };
      } else {
        return {
          success: false,
          message: `项目编号：${project.projCode}已存在`,
          data: exist,
        };
      }
    }

    await this.projectRepository.save(project);
    return { success: true, data: project };
  }

  async procedureList(): Promise<Procedure[]> {
    return await this.procedureRepository.find();
  }

  async procedureConfigUpdate(procedure: Procedure) {
    // 第一步：先查出目标数据
    const target = await this.procedureRepository.findOne({
      where: { id: procedure.id },
    });

    // 第二步：更新 config 字段
    target.config = procedure.config;

    // 第三步：保存更新
    this.procedureRepository.save(target);
  }

  async modify(project: any) {
    if (!project) {
      this.logger.error('project is null');
      return { success: false, data: {}, message: 'project is null' };
    }

    let exist = await this.projectRepository.find({
      where: [
        {
          name: project.name,
          id: Not(project.id),
        },
        {
          projCode: project.projCode,
          id: Not(project.id),
        },
      ],
      take: 1,
    });

    if (exist && exist.length > 0) {
      if (exist[0].name === project.name) {
        return {
          success: false,
          message: `项目名称：${project.name}已存在`,
          data: exist,
        };
      } else {
        return {
          success: false,
          message: `项目编号：${project.projCode}已存在`,
          data: exist,
        };
      }
    }

    await this.projectRepository.save(project);
    return { success: true, data: project };
  }

  async modifyNode(node: any) {
    return this.nodeRepository.save(node);
  }

  async delete(id: number) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['stages'],
    });
    if (!project) {
      return;
    }
    if (project.stages) {
      for (let i = 0; i < project.stages.length; i++) {
        await this.nodeRepository.delete({ stage: project.stages[i] });
        await this.stageRepository.delete(project.stages[i].id);
      }
    }
    await this.projectRepository.delete(project.id);
  }

  async nodeStart(nodeId: number) {
    await this.nodeRepository.update(
      {
        actualStart: new Date(),
      },
      { id: nodeId }
    );
    return { success: true };
  }

  async nodeComplete(nodeId: number, ctx: Context) {
    const user = ctx.session.user;
    if (!user || !user.id) {
      return { success: false, message: '用户未登录' };
    }

    await this.nodeRepository.update(
      {
        actualEnd: new Date(),
        handleBy: user.id,
      },
      { id: nodeId }
    );
    return { success: true };
  }

  async list(params: any) {
    const where = {};
    params.name && (where['name'] = Like(`%${params.name}%`));
    params.year && (where['year'] = params.year);
    const qb = this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.company', 'company')
      .leftJoinAndSelect('project.stages', 'stages')
      .leftJoinAndSelect('stages.nodes', 'node')
      .where(where);
    if (params.delayedStatus === -1) {
      // 查询延迟的项目：project.id IN (select projectId ...)
      const subQuery = qb
        .subQuery()
        .select('stages.projectId')
        .from(Stage, 'stages')
        .innerJoin('stages.nodes', 'node')
        .where(
          'julianday(node.actualEnd) - julianday(node.actualStart) > julianday(node.plannedEnd) - julianday(node.plannedStart)'
        )
        .getQuery();

      qb.andWhere(`project.id IN ${subQuery}`);
    } else if (params.delayedStatus === 1) {
      // 查询未延迟的项目：NOT EXISTS (select 1 from stages join nodes where ...)
      const subQuery = qb
        .subQuery()
        .select('1')
        .from(Stage, 'stages')
        .innerJoin('stages.nodes', 'node')
        .where('stages.projectId = project.id')
        .andWhere(
          'julianday(node.actualEnd) - julianday(node.actualStart) > julianday(node.plannedEnd) - julianday(node.plannedStart)'
        )
        .getQuery();

      qb.andWhere(`NOT EXISTS ${subQuery}`);
    }
    const data = await qb.getMany();
    return data;
  }
}
