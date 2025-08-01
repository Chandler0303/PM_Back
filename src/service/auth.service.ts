import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { Org } from '../entity/org.entity';

@Provide()
export class AuthService {
  @InjectEntityModel(User)
  userRepository: Repository<User>;
  @InjectEntityModel(Org)
  orgRepository: Repository<Org>;

  async register(body: { username: string; password: string; name: number; orgId: number; permissions: string; }): Promise<any> {
    if (!await this.check(body.username, body.password)) {
      return new Promise((res, _) => res({code: -1, message: '用户已存在'}))
    }
    const user = new User();
    user.username = body.username
    user.password = body.password
    user.permissions = body.permissions

    const org = await this.orgRepository.findOne({where: {id: body.orgId}})
    if (!org) {
      return new Promise((res, _) => res({code: -1, message: '组织机构不存在'}))
    }

    user.org = org
    return {code: 200, data: await this.userRepository.save(user)};
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async check(username: string, password: string): Promise<Boolean> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && user.password === password) {
      return false;
    }
    return true;
  }
}
