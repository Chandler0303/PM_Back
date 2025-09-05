import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

/**
 * app版本
 */
@Entity()
export class Version {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 名称
   */
  @Column({ unique: true, length: 64 })
  name: string;

  /**
   *  版本号
   */
  @Column({ unique: true, length: 64 })
  version: string;
  
  /**
   *   路径
   */
  @Column({ length: 64 })
  wgtUrl: string;

  /**
   * 备注
   */
  @Column({nullable: true, length: 512})
  remark: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
