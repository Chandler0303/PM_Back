import {ILogger, Logger, Provide} from '@midwayjs/core';
import {InjectEntityModel} from '@midwayjs/typeorm';
import {FindOptionsOrder, Like, Repository} from 'typeorm';
import {Project} from '../entity/project.entity';
import {Stage} from '../entity/stage.entity';
import {Node} from '../entity/node.entity';
import {Procedure} from '../entity/procedure.entity';
import {Company} from "../entity/company.entity";
import {Context} from "@midwayjs/koa";

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
    page: number, size: number, sortField: string, sortDir: string
  } | any) {
    console.log('params', params)

    const where = {}
    params.projCode && (where['projCode'] = Like(`%${params.projCode}%`))
    params.year && (where['year'] = params.year)
    params.name && (where['name'] = Like(`%${params.name}%`))
    params.type && (where['type'] = params.type)
    params.stage && (where['stage'] = params.stage)
    params.status && (where['status'] = params.status)
    params.companyId && (where['companyId'] = params.companyId)

    const count = await this.projectRepository.countBy(where)
    if (!count || count < 1) {
      return {total: count}
    }

    const page = params.page || 1
    const size = params.size || 10
    const skip = (page - 1) * size

    const order: FindOptionsOrder<Project> = params.sortField ? {[params.sortField]: params.sortDir || 'ASC'} : null
    return {
      total: count,
      data: await this.projectRepository.find({
        where,
        order,
        skip,
        take: size,
        relations: ['company', 'stages', 'stages.nodes']
      })
    }
  }

  async create(project: Project) {
    if (!project) {
      this.logger.error('project is null')
      return
    }

    console.log(project)
    const exist = await this.projectRepository.find({
      where: [
        {name: project.name}, {projCode: project.projCode}
      ], take: 1
    })
    console.log(exist)
    if (exist && exist.length > 0) {
      console.log('project already exist')
      if (exist[0].name === project.name) {
        return {success: false, message: `项目名称：${project.name}已存在`, data: exist}
      } else {
        return {success: false, message: `项目编号：${project.projCode}已存在`, data: exist}
      }
    }

    await this.projectRepository.save(project)
    return {success: true, data: project}
  }

  async procedureList(): Promise<Procedure[]> {
    return await this.procedureRepository.find();
  }

  async procedureConfigUpdate(procedure: Procedure) {

    // 第一步：先查出目标数据
    const target = await this.procedureRepository.findOne({
      where: {id: procedure.id},
    });

    // 第二步：更新 config 字段
    target.config = procedure.config;

    // 第三步：保存更新
    this.procedureRepository.save(target);
  }

  async modify(project: any) {
    return this.projectRepository.updateAll(project)
  }

  async modifyNode(node: any) {
    return this.nodeRepository.save(node)
  }

  async delete(id: number) {
    const project = await this.projectRepository.findOne({where: {id}, relations: ['stages']})
    if (!project) {
      return
    }
    console.log(project)

    if (project.stages) {
      project.stages.forEach(stage => {
        console.log(stage)
        this.nodeRepository.delete({stage: stage})
        this.stageRepository.delete(stage)
      })
    }
    await this.projectRepository.remove(project)
  }

  async nodeStart(nodeId: number) {
    await this.nodeRepository.update({
      actualStart: new Date()
    }, {id: nodeId})
    return {success: true}
  }

  async nodeComplete(nodeId: number, ctx: Context) {
    const user = ctx.session.user
    if (!user || !user.id) {
      return {success: false, message: '用户未登录'}
    }

    await this.nodeRepository.update({
      actualEnd: new Date(),
      handleBy: user.id
    }, {id: nodeId})
    return {success: true}
  }
}
