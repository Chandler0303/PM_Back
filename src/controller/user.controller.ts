import { Inject, Controller, Get } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';

@Controller('/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/info')
  async getUser() {
    return { success: true, data: this.ctx.session.user }
  }

  @Get("/list")
  async users() {
    return { success: true, data: await this.userService.list() }
  }
}
