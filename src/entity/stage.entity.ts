import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 项目阶段节点
 */
@Entity()
export class Stage {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 阶段名称
   */
  @Column({ unique: true, length: 64 })
  name: string;

  /**
   * 阶段序号
   */
  @Column()
  seq: number;

  /**
   * 所属项目id
   */
  @Column()
  projectId: string;
}
