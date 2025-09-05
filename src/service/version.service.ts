import { Config, ILogger, Logger, Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Version } from '../entity/version.entity';
import * as fs from 'fs';

@Provide()
export class VersionService {
    @Config('upload')
    uploadConfig;

  @InjectEntityModel(Version)
  versionRepository: Repository<Version>;

  @Logger('project')
  logger: ILogger;
  
  async create(version: Version) {
    if (!version) {
      this.logger.error('version is null');
      return { success: false, data: {}, message: 'version is null' };;
    }

    const exist = await this.versionRepository.find({
      where: [{ name: version.name}, {version: version.version }],
      take: 1,
    });
    if (exist && exist.length > 0) {
      return {
        success: false,
        message: `版本名称或者版本号已存在`,
        data: exist,
      };
    }

    await this.versionRepository.save(version);
    return { success: true, data: version };
  }

  async list(params: any) {
    const where = {};
    params.name && (where['name'] = Like(`%${params.name}%`));

    return await this.versionRepository.find({
        where,
        order: {
            createdDate: 'DESC',
        }
    });
  }

  async delete(id) {
    const delVersion = await this.versionRepository.findOneBy({id});
    if (delVersion.wgtUrl) {
        const filename = delVersion.wgtUrl.split('/').pop();
        const filePath = this.uploadConfig.getFilePath(filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
    return await this.versionRepository.delete(id);
  }
}
