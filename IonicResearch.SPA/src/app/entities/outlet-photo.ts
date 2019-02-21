import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { OutletForm } from './outlet-form';

@Entity('OutletPhoto')
export class OutletPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 1000 })
  path: string;

  @Column({ length: 1000 })
  filePath: string;

  @ManyToOne(type => OutletForm, form => form.photos, {
    cascade: true
  })
  form: OutletForm;
}
