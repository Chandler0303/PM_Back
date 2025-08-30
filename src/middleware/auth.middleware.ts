import { Middleware, IMiddleware } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';

@Middleware()
export class AuthMiddleware implements IMiddleware<Context, NextFunction> {
  ignores = ['/auth/login', '/']
  appIgnores = (url) => {
    return url.indexOf('/project/list') !== -1
  }
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const user = ctx.session.user
      if (!user && !this.ignores.includes(ctx.url) && !this.appIgnores(ctx.url)) {
        ctx.body = { success: false, code: 401, message: '请先登录' }
        return
      }
      await next()
    }
  }

  static getName(): string {
    return 'auth';
  }
}
