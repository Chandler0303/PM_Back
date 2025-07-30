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

  /**
   * 计划开始时间
   */
  @Column()
  plannedStart: Date;

  /**
   * 计划结束时间
   */
  @Column()
  plannedEnd: Date;

  /**
   * 实际开始时间
   */
  @Column()
  actualStart: Date;

  /**
   * 实际结束时间
   */
  @Column()
  actualEnd: Date;

  /**
   * 备注
   */
  @Column({ length: 256 })
  remark: string;

  /**
   * 负责人，多个逗号分割
   */
  @Column({ length: 512 })
  principal: string;

  /**
   * 完成人
   */
  @Column({ length: 512 })
  handleBy: string;
}
