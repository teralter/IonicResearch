import { Entity, PrimaryColumn, Column, Index } from 'typeorm';
@Entity('FiasHouses')
export class FiasHouse {
  @PrimaryColumn()
  id: number;

  @Index()
  @Column()
  aoId: number;

  @Column({ length: 20, nullable: true })
  h: string;

  @Column({ length: 10, nullable: true })
  b: string;

  @Column({ length: 10, nullable: true })
  s: string;
}
