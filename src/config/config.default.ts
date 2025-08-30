import { MidwayConfig } from '@midwayjs/core';
import path = require('node:path');

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1753794270813_2333',
  koa: {
    port: 7001
  },
  staticFile: {
    dirs: {
      default: {
        prefix: '/uploads',
        dir: path.join(__dirname, '../../uploads'), 
      },
    }
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'sqlite',
        database: path.join(__dirname, '../../pm.sqlite'),
        synchronize: true,
        foreignKeys: true,
        logging: true,
        entities: [
          'entity',
          '**/*.entity.{j,t}s',
        ]
      }
    }
  }
} as MidwayConfig;
