import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 公司
 */
@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 公司名
   */
  @Column()
  name: string;

  /**
   * 优先级
   */
  @Column()
  priority: number;
}
