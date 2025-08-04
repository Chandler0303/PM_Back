import {ILogger, Logger, Provide} from '@midwayjs/core';
import {InjectEntityModel} from '@midwayjs/typeorm';
import {FindOptionsOrder, Like, Repository} from 'typeorm';
import {Project} from '../entity/project.entity';
import {Stage} from '../entity/stage.entity';
import {Node} from '../entity/node.entity';
import {Procedure} from '../entity/procedure.entity';
import {Company} from "../entity/company.entity";

@Provide()
export class ProjectService {
  @InjectEntityModel(Project)
  projectRepository: Repository<Project>
  @InjectEntityModel(Stage)
  stageRepository: Repository<Stage>
  @InjectEntityModel(Node)
  nodeRepository: Repository<Node>
  @InjectEntityModel(Procedure)
  procedureRepository: Repository<Procedure>
  @InjectEntityModel(Company)
  companyRepository: Repository<Company>

  @Logger('project')
  logger: ILogger

  async page(params: {
    projCode: string, year: string, name: string, type: string,
    stage: number, status: number, companyId: number,
    page: number, pageSize: number, sortField: string, sortDir: string
  } | any) {
    const where = {}
    params.projCode && (where['projCode'] = Like(`%${params.projCode}%`))
    params.year && (where['year'] = params.year)
    params.name && (where['name'] = Like(`%${params.name}%`))
    params.type && (where['type'] = params.type)
    params.stage && (where['stage'] = params.stage)
    params.status && (where['status'] = params.status)
    params.companyId && (where['companyId'] = params.companyId)

    const page = params.page || 1
    const pageSize = params.pageSize || 10
    const skip = (page - 1) * pageSize

    const order: FindOptionsOrder<Project> = params.sortField ? {[params.sortField]: params.sortDir || 'ASC'} : null
    return this.projectRepository.find({where, order, skip, take: pageSize})
  }

  async create(project: Project) {
    if (!project) {
      this.logger.error('project is null')
      return
    }
    const stages = project.stages

    await this.projectRepository.save(project)
    if (stages) {
      stages.forEach(stage => {
        this.stageRepository.save(stage)
        if (stage.nodes) {
          stage.nodes.forEach(node => {
            this.nodeRepository.save(node)
          })
        }
      })
    }
  }

  async procedureList(): Promise<Procedure[]> {
    return this.procedureRepository.find();
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

  async modify(body: any) {
    return this.projectRepository.updateAll(body.project)
  }

  async modifyNode(body: any) {
    return this.nodeRepository.updateAll(body.node)
  }

  async delete(id: number) {
    const project = await this.projectRepository.findOneBy({id})
    if (!project) {
      return
    }

    // project.status && await this.stageRepository.delete()
    // await this.stageRepository.delete({projectId: id})
    // await this.nodeRepository.delete({projectId: id})
    // return this.projectRepository.delete(id)
  }
}
