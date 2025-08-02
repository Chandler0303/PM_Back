import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { Company } from './company.entity';
import { Stage } from './stage.entity'

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
  @Column({ unique: true })
  projCode: string;

  /**
   * 年度
   */
  @Column()
  year: string;

  /**
   * 工程名称
   */
  @Column({ unique: true })
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
   * 项目阶段
   */
  @Column()
  stage: number;

  /**
   * 工程状态
   */
  @Column()
  status: number;

  /**
   * 分公司
   */
  @OneToOne(type => Company)
  @JoinColumn()
  company: Company;

  /**
   * 项目开始时间
   */
  @Column()
  startTime: Date;

  /**
   * 项目完成时间
   */
  @Column()
  endTime: Date;

  @JoinColumn()
  stages: Stage[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
