import { Inject, Controller, Get, Post, Put, Del, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ProjectService } from '../service/project.service'

@Controller('/project')
export class ProjectController {
  @Inject()
  ctx: Context
  @Inject()
  projectService: ProjectService;

  @Get('/page')
  async page(params: any) {
    const projectPage = this.projectService.page(params);
    return { success: true, data: projectPage }
  }

  @Get('/procedures')
  async procedures() {
    return { success: true, data: await this.projectService.procedureList() }
  }

  @Post('/')
  async create(@Body() project: any) {
    await this.projectService.create(project)
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
