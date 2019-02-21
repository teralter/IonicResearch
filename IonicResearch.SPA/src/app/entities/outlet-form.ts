import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

import { OutletPhoto } from './outlet-photo';
import { OutletProduct } from './outlet-product';
import { OutletType } from './outlet-type';

@Entity('OutletForm')
export class OutletForm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  repDate: Date;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 12 })
  inn: string;

  @Column({ length: 200 })
  address: string;

  @Column()
  openingTime: number;

  @Column({ nullable: true, type: 'real' })
  latitude: number;

  @Column({ nullable: true, type: 'real' })
  longitude: number;

  @ManyToOne(type => OutletType, type => type.forms)
  type: OutletType;

  @OneToMany(type => OutletPhoto, photo => photo.form)
  photos: OutletPhoto[];

  @OneToMany(type => OutletProduct, product => product.form)
  products: OutletProduct[];

}
