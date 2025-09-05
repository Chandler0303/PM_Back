import { MidwayConfig } from '@midwayjs/core';
import path = require('node:path');

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1753794270813_2333',
  koa: {
    port: 7001
  },
  upload: {
    dir: path.join(process.cwd(), 'uploads'),   // 上传目录
    getFilePath(filename: string) {
      return path.join(process.cwd(), 'uploads', filename);
    }
  },
  staticFile: {
    dirs: {
      default: {
        prefix: '/uploads',
        dir: path.join(__dirname, '../../uploads'), 
      },
    }
  },
  busboy: {
    whitelist: () => {
      return [
        '.jpg',
        '.jpeg',
        '.png',
        '.wgt'
      ];
    },
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'sqlite',
        database: path.join(__dirname, '../../pm.sqlite'),
        synchronize: false,
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
