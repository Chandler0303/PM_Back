import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Stage} from './stage.entity';

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
   * 所属阶段
   */
  @ManyToOne(type => Stage, stage => stage.nodes)
  stage: Stage;

  /**
   * 计划开始时间
   */
  @Column({nullable: true})
  plannedStart: Date;

  /**
   * 计划结束时间
   */
  @Column({nullable: true})
  plannedEnd: Date;

  /**
   * 实际开始时间
   */
  @Column({nullable: true})
  actualStart: Date;

  /**
   * 实际结束时间
   */
  @Column({nullable: true})
  actualEnd: Date;

  /**
   * 节点状态
   */
  @Column()
  status: number;

  /**
   * 节点类型
   */
  @Column()
  type: number;

  /**
   * 备注
   */
  @Column({nullable: true, length: 512})
  remark: string;

  /**
   * 负责人，多个逗号分割
   */
  @Column({length: 512})
  principal: string;

  /**
   * 制度要求时间
   */
  @Column({nullable: true})
  plannedDays: number;

  /**
   * 完成人
   */
  @Column({length: 512, nullable: true})
  handleBy: string;
}
