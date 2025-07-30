import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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
   * 权限数组 例: ['1001', '1002']
   */
  @Column({length: 512})
  permissions: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
