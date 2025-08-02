import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany } from 'typeorm';
import { Node } from './node.entity'

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

  @JoinColumn()
  @OneToMany(type => Node, node => node.stage)
  nodes: Node[]
}
