import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userRepository: Repository<User>;

  async getCurUser(sessionId: string) {
    return await this.userRepository.findOne({where: {username: sessionId}})
  }
}
