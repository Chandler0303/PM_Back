import {Inject, Controller, Get, Post, Put, Del, Body, Param} from '@midwayjs/core';
import {Context} from '@midwayjs/koa';
import {ProjectService} from '../service/project.service'
import {Project} from "../entity/project.entity";

@Controller('/project')
export class ProjectController {
  @Inject()
  ctx: Context
  @Inject()
  projectService: ProjectService;

  @Get('/page')
  async page() {
    const projectPage = await this.projectService.page(this.ctx.query);
    return {success: true, data: projectPage}
  }

  /**
   * 获取流程模板列表
   */
  @Get('/procedures')
  async procedures() {
    return {success: true, data: await this.projectService.procedureList()}
  }
  /**
   * 流程模版配置
   */
  @Put('/procedureConfig')
  async procedureConfig(@Body() params) {
    console.log(params)
    await this.projectService.procedureConfigUpdate(params)
    return { success: true }
  }

  /**
   * 创建项目
   *
   * @param params 项目信息 包含阶段+节点
   */
  @Post('/')
  async create(@Body() params: { project: Project }) {
    await this.projectService.create(params.project)
    return {success: true}
  }

  @Put('/modify')
  async modify() {
    await this.projectService.modify(this.ctx.body)
    return {success: true}
  }

  @Put('/node/complete')
  async nodeComplete() {
    return {success: true}
  }

  @Put('/node/modify')
  async nodeModify() {
    await this.projectService.modifyNode(this.ctx.body)
    return {success: true}
  }

  @Del('/:id')
  async delete(@Param('id') id: string) {
    await this.projectService.delete(+id)
    return {success: true}
  }
}
