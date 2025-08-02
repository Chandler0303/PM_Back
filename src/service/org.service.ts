import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Org } from '../entity/org.entity';

@Provide()
export class OrgService {
  @InjectEntityModel(Org)
  orgRepository: Repository<Org>;

  async list() {
    return await this.orgRepository.find()
  }
}
