import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository, Like, FindOptionsOrder } from 'typeorm';
import { Project } from '../entity/project.entity';
import { Stage } from '../entity/stage.entity';
import { Node } from '../entity/node.entity';
import { Procedure } from '../entity/procedure.entity';

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

  async page(params: {
    projCode: string, year: string, name: string, type: string,
    stage: number, status: number, companyId: number,
    page: number, pageSize: number, sortField: string, sortDir: string
  }) {
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

    const order: FindOptionsOrder<Project> = params.sortField ? { [params.sortField]: params.sortDir || 'ASC' } : null
    return this.projectRepository.find({ where, order, skip, take: pageSize })
  }

  async create(params: {project: Project}) {
    this.projectRepository.save(params.project)
  }

  async procedureList(): Promise<Procedure[]> {
    return this.procedureRepository.find();
  }

  // private genProj(cfgStr: string) {
  //   const cfg = JSON.parse(cfgStr)
  //   cfg?.stages?.array.forEach(sc => {
  //     const s = new Stage()
  //     s.seq = sc.seq
  //     s.name = sc.stageName
  //     sc.nodes?.array.map(nc => {
  //       const n = new Node()
  //       n.name = nc.name
  //       n.seq = nc.seq
        
  //     });
  //   });
  // }
}
