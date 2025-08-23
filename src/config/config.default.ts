import { MidwayConfig } from '@midwayjs/core';
import path = require('node:path');
import { uploadWhiteList } from '@midwayjs/upload';
import { tmpdir } from 'os';
import { join } from 'path';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1753794270813_2333',
  koa: {
    port: 7001,
  },
  upload: {
    // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
    mode: 'file',
    // fileSize: string, 最大上传文件大小，默认为 10mb
    fileSize: '10mb',
    // whitelist: string[]，文件扩展名白名单
    whitelist: uploadWhiteList.filter(ext => ext !== '.pdf'),
    // tmpdir: string，上传的文件临时存储路径
    tmpdir: join(tmpdir(), 'midway-upload-files'),
    // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
    cleanTimeout: 5 * 60 * 1000,
    // base64: boolean，设置原始body是否是base64格式，默认为false，一般用于腾讯云的兼容
    base64: false,
    // 仅在匹配路径到 /project/import 的时候去解析 body 中的文件信息
    match: /\/project\/import/
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
