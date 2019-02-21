import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { of } from 'rxjs';
import { OutletForm } from '../entities/outlet-form';
import { getRepository, Repository } from 'typeorm';

@Injectable({
  providedIn: 'root'
})
export class OutletFormResolverService implements Resolve<any> {

  constructor() { }

  async resolve(route: ActivatedRouteSnapshot) {
    const formId = +route.paramMap.get('id');

    if (formId === 0) {
      return of(new OutletForm());
    } else {
      const formRepository = getRepository('OutletForm') as Repository<OutletForm>;
      return await formRepository.findOne(formId, { relations: ['type', 'photos', 'products'] });
    }
  }

}
