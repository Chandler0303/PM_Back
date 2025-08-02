import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entity/company.entity';

@Provide()
export class CompanyService {
  @InjectEntityModel(Company)
  companyRepository: Repository<Company>;

  async list() {
    return await this.companyRepository.find()
  }
}
