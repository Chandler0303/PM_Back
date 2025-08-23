import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as upload from '@midwayjs/upload';
import { join } from 'path';
import { DefaultErrorFilter } from './filter/default.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { AuthMiddleware } from './middleware/auth.middleware';
import * as orm from '@midwayjs/typeorm';


@Configuration({
  imports: [
    koa,
    validate,
    orm,
    upload,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    this.app.useMiddleware([AuthMiddleware]);
    // add filter
    this.app.useFilter([DefaultErrorFilter]);
  }
}
