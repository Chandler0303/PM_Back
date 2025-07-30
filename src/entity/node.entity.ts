import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 流程节点
 */
@Entity()
export class Node {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 节点名称
   */
  @Column()
  name: string;

  /**
   * 节点序号
   */
  @Column()
  seq: number;

  /**
   * 所属流程id
   */
  @Column()
  procedureId: string;

  /**
   * 所属阶段id
   */
  @Column()
  stageId: string;

}
