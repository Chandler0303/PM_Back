import { ILogger, Logger, Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { Org } from '../entity/org.entity';

@Provide()
export class UserService {
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
      select: { id: true, username: true, name: true, password: true, permissions: true, avatar: true },
      relations: ['org'],
    });
  }

  async delete(id) {
    this.userRepository.delete(id);
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
