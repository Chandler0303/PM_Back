import { Inject, Controller, Get } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';

@Controller('/user')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/info')
  async getUser() {
    const sessionId = this.ctx.cookies.get('sessionId', { encrypt: true })
    return { success: true, message: 'OK', data: await this.userService.getCurUser(sessionId) }
  }
}
