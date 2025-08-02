import { Inject, Controller, Get } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { CompanyService } from '../service/company.service';

@Controller('/company')
export class CompanyController {
  @Inject()
  ctx: Context;

  @Inject()
  comService: CompanyService;

  @Get("/list")
  async orgs() {
    return {success: true, data: await this.comService.list()}
  }
}
