import { Inject, Controller, Get, Post, Put, Del, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ProjectService } from '../service/project.service'
import {Project} from "../entity/project.entity";

@Controller('/project')
export class ProjectController {
  @Inject()
  ctx: Context
  @Inject()
  projectService: ProjectService;

  @Get('/page')
  async page() {
    const projectPage = this.projectService.page(this.ctx.query);
    return { success: true, data: projectPage }
  }

  /**
   * 获取流程模板列表
   */
  @Get('/procedures')
  async procedures() {
    return { success: true, data: await this.projectService.procedureList() }
  }

  /**
   * 创建项目
   *
   * @param params 项目信息 包含阶段+节点
   */
  @Post('/')
  async create(@Body() params: {project: Project}) {
    await this.projectService.create(params.project)
    return { success: true }
  }

  @Put('/modify')
  async modify() {
    return { success: true }
  }

  @Put('/node/complete')
  async nodeComplete() {
    return {success: true}
  }

  @Del('/')
  async delete() {
    return { success: true }
  }
}
