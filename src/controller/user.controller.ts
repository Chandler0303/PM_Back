import { Inject, Controller, Get, Body, Post, Del, Param, Put } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { User } from '../entity/user.entity';

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
    return { success: true, data: await this.userService.list(this.ctx.query) }
  }
  @Post('/')
  async create(@Body() params: User) {
    await this.userService.create(params)
    return { success: true }
  }
   @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: User,
  ) {
    await this.userService.updateUserById(+id, updateUserDto);
    return { success: true };
  }
  @Del('/:id')
  async delete(@Param('id') id: string) {
    await this.userService.delete(+id); // 转换为 number 类型
    return { success: true };
  }
}
