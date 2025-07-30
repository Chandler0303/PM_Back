import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 组织
 */
@Entity()
export class Org {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  companyId: string;
}
