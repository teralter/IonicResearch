import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { OutletForm } from './outlet-form';

@Entity('OutletProduct')
export class OutletProduct {
  @PrimaryColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @ManyToOne(type => OutletForm, form => form.products, {
    cascade: true
  })
  form: OutletForm;
}
