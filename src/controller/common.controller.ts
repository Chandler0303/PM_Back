import { Inject, Controller, Post, Files, Config } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UploadFileInfo, UploadMiddleware } from '@midwayjs/busboy';
import path = require('path');
import * as fs from 'fs';

@Controller('/common')
export class UserController {
  @Config('upload.dir')
  uploadDir: string;

  @Inject()
  ctx: Context;
  @Post('/upload', { middleware: [UploadMiddleware] })
  async upload(@Files() file:  Array<UploadFileInfo>) {
    // 获取第一个文件的临时路径
    const tempFilePath = file[0].data;
    const originalFileName = file[0].filename;
    const timestamp = Date.now();

    // 设置目标保存路径
    const targetFilePath = path.join(this.uploadDir, timestamp + '_' +originalFileName);

    // 确保目标目录存在
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir);
    }

    // 将临时文件移动到目标路径
    fs.renameSync(tempFilePath, targetFilePath);
    return {success: true, message: '文件上传成功',
      file: {
        filePath: timestamp + '_' +originalFileName,
      }}
  }
}
