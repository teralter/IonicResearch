import { Injectable } from '@angular/core';
import { createConnection, getRepository, Repository } from 'typeorm';
import { OutletForm } from '../entities/outlet-form';
import { OutletType } from '../entities/outlet-type';
import { OutletPhoto } from '../entities/outlet-photo';
import { OutletProduct } from '../entities/outlet-product';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { FiasAddressObject } from '../entities/fias-address-object';
import { FiasHouse } from '../entities/fias-house';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  databaseReady = new BehaviorSubject<boolean>(false);

  constructor(
    private platform: Platform
  ) { }

  async init() {
    await createConnection({
      type: 'cordova',
      database: 'IonicResearch3.db',
      location: 'default',
      logging: ['error', 'query', 'schema'],
      synchronize: true,
      entities: [
        OutletForm,
        OutletType,
        OutletPhoto,
        OutletProduct,
        FiasAddressObject,
        FiasHouse
      ]
    });
    this.databaseReady.next(true);
  }
}
