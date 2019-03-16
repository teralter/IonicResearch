import { Entity, PrimaryColumn, Column, Index } from 'typeorm';

@Entity('FiasAddressObjects')
export class FiasAddressObject {
  @PrimaryColumn()
  id: number;

  @Index()
  @Column({ nullable: true })
  parentId?: number;

  @Column({ length: 120 })
  formalName: string;

  @Column({ length: 10 })
  shortName: string;

  @Column()
  level: number;
}
