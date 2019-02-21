import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { OutletForm } from './outlet-form';

@Entity('OutletType')
export class OutletType {
  @PrimaryColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @OneToMany(type => OutletForm, form => form.type)
  forms: OutletForm[];
}
