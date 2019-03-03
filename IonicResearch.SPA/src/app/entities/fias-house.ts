import { Entity, PrimaryColumn, Column } from 'typeorm';
@Entity('FiasHouses')
export class FiasHouse {
  @PrimaryColumn()
  id: number;

  @PrimaryColumn()
  aoId: number;

  @Column({ length: 20, nullable: true })
  h: string;

  @Column({ length: 10, nullable: true })
  b: string;

  @Column({ length: 10, nullable: true })
  s: string;
}
