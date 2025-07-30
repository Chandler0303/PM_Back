import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 流程
 */
@Entity()
export class Procedure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'json' })
  config: JSON
}
