import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 公司
 */
@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

}
