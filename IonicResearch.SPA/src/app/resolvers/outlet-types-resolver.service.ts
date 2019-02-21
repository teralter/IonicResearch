import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { getRepository, Repository } from 'typeorm';
import { OutletType } from '../entities/outlet-type';

@Injectable({
  providedIn: 'root'
})
export class OutletTypesResolverService implements Resolve<any> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot) {
    const typeRepository = getRepository('OutletType') as Repository<OutletType>;
    return typeRepository.find();
  }
}
