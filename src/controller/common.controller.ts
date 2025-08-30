import { Inject, Controller, Post, Files } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UploadFileInfo, UploadMiddleware } from '@midwayjs/busboy';
import path = require('path');
import * as fs from 'fs';

@Controller('/common')
export class UserController {
  @Inject()
  ctx: Context;
  @Post('/upload', { middleware: [UploadMiddleware] })
  async uploadImage(@Files() file:  Array<UploadFileInfo>) {
    console.log(file)
    // 获取第一个文件的临时路径
    const tempFilePath = file[0].data;
    const originalFileName = file[0].filename;
    const timestamp = Date.now();

    // 设置目标保存路径
    const targetDir = path.join(__dirname, '../../uploads');
    const targetFilePath = path.join(targetDir, timestamp + '_' +originalFileName);

    // 确保目标目录存在
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir);
    }

    // 将临时文件移动到目标路径
    fs.renameSync(tempFilePath, targetFilePath);
    return {success: true, message: '文件上传成功',
      file: {
        filePath: targetFilePath,
      }}
  }
}
