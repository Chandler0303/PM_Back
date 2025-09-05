import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne, OneToMany
} from 'typeorm';
import {Company} from './company.entity';
import {Stage} from './stage.entity'
import { User } from './user.entity';

/**
 * 项目
 */
@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 工程编号
   */
  @Column({unique: true})
  projCode: string;

  /**
   * 年度
   */
  @Column()
  year: string;

  /**
   * 工程名称
   */
  @Column({unique: true})
  name: string;

  /**
   * 合同金额
   */
  @Column()
  amount: string;

  /**
   * 项目类型
   */
  @Column()
  type: string;

  /**
   * 业务类型
   */
  @Column()
  businessType: string;

  /**
   * 是否搁置
   */
  @Column()
  shelve: number = 0;

  /**
   * 项目阶段
   */
  @Column()
  stage: number = 1;

  /**
   * 工程状态
   */
  @Column()
  status: number;

  /**
   * 分公司
   */
  @ManyToOne(type => Company)
  company: Company;


  /**
   * 管理员
   */
  @ManyToOne(type => User, { nullable: true })
  user: User;

  /**
   * 备注
   */
  @Column({nullable: true, length: 512})
  remark: string;

  /**
   * 项目开始时间
   */
  @Column({nullable: true})
  startTime: Date;

  /**
   * 项目完成时间
   */
  @Column({nullable: true})
  endTime: Date;

  @OneToMany(type => Stage, stage => stage.project, {cascade: true, onDelete: 'CASCADE'})
  stages: Stage[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
