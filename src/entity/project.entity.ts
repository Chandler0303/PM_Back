import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

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
  @Column()
  companyId: string;
  
  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
