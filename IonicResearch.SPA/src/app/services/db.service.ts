import { Injectable } from '@angular/core';
import { createConnection, getRepository, Repository } from 'typeorm';
import { OutletForm } from '../entities/outlet-form';
import { OutletType } from '../entities/outlet-type';
import { OutletPhoto } from '../entities/outlet-photo';
import { OutletProduct } from '../entities/outlet-product';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { async } from '@angular/core/testing';

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
        OutletProduct
      ]
    });
    const typeRepository = getRepository('OutletType') as Repository<OutletType>;
    const typesCount = await typeRepository.count();
    if (typesCount === 0) {
      const types = [
        { id: 1, name: 'Гипермаркет' },
        { id: 2, name: 'Киоск' },
        { id: 3, name: 'Хорека' },
        { id: 4, name: 'Пивнушка' },
        { id: 5, name: 'Рынок' }
      ];

      await Promise.all(types.map(async (t) => {
        const type = new OutletType();
        type.id = t.id;
        type.name = t.name;
        await typeRepository.save(type);
      }));

      this.databaseReady.next(true);
    } else {
      this.databaseReady.next(true);
    }
  }
}
