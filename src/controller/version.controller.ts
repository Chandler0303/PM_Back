import { Inject, Controller, Get, Body, Post, Del, Param } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { VersionService } from '../service/version.service';
import { Version } from '../entity/version.entity';

@Controller('/version')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  versionService: VersionService;

  @Get("/")
  async versions() {
    return { success: true, data: await this.versionService.list(this.ctx.query) }
  }
  @Post('/')
  async create(@Body() params: Version) {
    return this.versionService.create(params)
  }
  @Del('/:id')
  async delete(@Param('id') id: string) {
    await this.versionService.delete(+id); // 转换为 number 类型
    return { success: true };
  }
}
