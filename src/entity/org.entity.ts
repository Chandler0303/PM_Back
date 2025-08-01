import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 部门
 */
@Entity()
export class Org {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 部门名称
   */
  @Column({ unique: true })
  name: string;

  /**
   * 优先级
   */
  @Column()
  priority: number;
}
