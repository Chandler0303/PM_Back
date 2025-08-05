import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany, ManyToOne} from 'typeorm';
import {Node} from './node.entity'
import {Project} from "./project.entity";

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
  @Column({length: 64})
  name: string;

  /**
   * 阶段序号
   */
  @Column()
  seq: number;

  @ManyToOne(type => Project)
  project: Project;

  @JoinColumn()
  @OneToMany(type => Node, node => node.stage, {cascade: true, onDelete: 'CASCADE'})
  nodes: Node[]
}
