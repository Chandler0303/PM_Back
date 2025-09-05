import { Config, ILogger, Logger, Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { Org } from '../entity/org.entity';
import * as fs from 'fs';

@Provide()
export class UserService {
  @Config('upload') uploadConfig;
  @InjectEntityModel(User)
  userRepository: Repository<User>;
  @InjectEntityModel(Org)
  orgRepository: Repository<Org>
  @Logger('project')
  logger: ILogger;
  

  async getCurUser(sessionId: string) {
    return await this.userRepository.findOne({
      where: { username: sessionId },
    });
  }

  async create(user: User) {
    if (!user) {
      this.logger.error('user is null');
      return { success: false, data: {}, message: 'user is null' };;
    }

    const exist = await this.userRepository.find({
      where: [{ username: user.username }],
      take: 1,
    });
    if (exist && exist.length > 0) {
      return {
        success: false,
        message: `用户账号：${user.username}已存在`,
        data: exist,
      };
    }

    await this.userRepository.save(user);
    return { success: true, data: user };
  }

  async list(query: {name: string} | any) {
    const where = {admin: false}
    query.name && (where['name'] = Like(`%${query.name}%`))
    return await this.userRepository.find({
      where,
      relations: ['org'],
    });
  }

  async delete(id) {
    const delUser = await this.userRepository.findOneBy({id});
    if (delUser.avatar) {
        const filename = delUser.avatar.split('/').pop();
        const filePath = this.uploadConfig.getFilePath(filename);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
    return await this.userRepository.delete(id);
  }

  async updateUserById(
    id: number,
    updateUserDto: any
  ) {
    const user = await this.userRepository.findOneBy({ id });
    Object.assign(user, updateUserDto);
    this.userRepository.save(user);
  }
}
