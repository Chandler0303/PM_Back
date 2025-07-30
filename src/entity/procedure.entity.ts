import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 流程
 */
@Entity()
export class Procedure {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 流程名
   */
  @Column({ unique: true })
  name: string;


  /**
   * 流程配置 参考 /src/template/procedure.json
   */
  @Column({ type: 'json' })
  config: JSON
}
