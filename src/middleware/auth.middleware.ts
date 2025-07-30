import { Middleware, IMiddleware } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';

@Middleware()
export class AuthMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const sessionId = ctx.cookies.get('sessionId', { encrypt: true })
      if (!sessionId && ctx.url != '/auth/login') {
        ctx.body = { code: 401, message: 'Unauthorized' }
        return
      }
      await next()
    };
  }

  static getName(): string {
    return 'auth';
  }
}
