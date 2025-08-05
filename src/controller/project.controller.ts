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
    return {success: true}
  }

  /**
   * 创建项目
   *
   * @param params 项目信息 包含阶段+节点
   */
  @Post('/')
  async create(@Body() params: Project) {
    await this.projectService.create(params)
    return {success: true}
  }

  @Put('/modify')
  async modify(@Body() params: Project) {
    await this.projectService.modify(params)
    return {success: true}
  }

  /**
   * 开始任务
   * @param nodeId 任务id
   */
  @Put('/node/:nodeId/start')
  async nodeStart(@Param('nodeId') nodeId: number) {
    await this.projectService.nodeStart(nodeId)
    return {success: true}
  }

  /**
   * 完成任务
   * @param nodeId 任务id
   */
  @Put('/node/:nodeId/complete')
  async nodeComplete(@Param('nodeId') nodeId: number) {
    await this.projectService.nodeComplete(nodeId, this.ctx)
    return {success: true}
  }

  /**
   * 修改任务
   */
  @Put('/node/modify')
  async nodeModify(@Body() params: any) {
    await this.projectService.modifyNode(params)
    return {success: true}
  }

  /**
   * 删除任务
   *
   * @param id
   */
  @Del('/:id')
  async delete(@Param('id') id: number) {
    await this.projectService.delete(id)
    return {success: true}
  }
}
