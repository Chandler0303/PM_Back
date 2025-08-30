import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import { Org } from './org.entity';

/**
 * 用户
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 账号
   */
  @Column({ unique: true, length: 64 })
  username: string;

  /**
   * 密码
   */
  @Column({ length: 256 })
  password: string;

  /**
   * 名称
   */
  @Column({ length: 64 })
  name: string;

  /**
   * 头像
   */
  @Column({ length: 512 , nullable: true})
  avatar: string | null;

  /**
   * 部门
   */
  @ManyToOne(type => Org)
  org: Org;

  /**
   * 权限数组 例: ['1001', '1002']
   */
  @Column({ length: 512 })
  permissions: string;

  /**
   * 管理员
   */
  @Column({ default: false })
  admin: boolean

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
