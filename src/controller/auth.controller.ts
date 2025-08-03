import { Inject, Controller, Post, Body } from '@midwayjs/core';
import { AuthService } from '../service/auth.service';
import { Context } from '@midwayjs/koa'

@Controller('/auth')
export class AuthController {
  @Inject()
  authService: AuthService
  @Inject()
  ctx: Context

  @Post('/login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (user) {
      this.ctx.cookies.set('sessionId', user.id.toString(), { encrypt: true });
      this.ctx.session.user = user
      return {success: true,  message: 'Login successful' };
    }
    return { message: 'Invalid username or password' };
  }

  @Post('/register')
  async register(@Body() body: { username: string; password: string; name: string; orgId: number; permissions: string; }) {
    const user = await this.authService.register(body);
    return { message: 'User registered', userId: user.id };
  }
}
