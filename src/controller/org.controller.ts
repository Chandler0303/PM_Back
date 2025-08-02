import { Inject, Controller, Get } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { OrgService } from '../service/org.service';

@Controller('/org')
export class OrgController {
  @Inject()
  ctx: Context;

  @Inject()
  orgService: OrgService;

  @Get("/list")
  async orgs() {
    return {success: true, data: await this.orgService.list()}
  }
}
