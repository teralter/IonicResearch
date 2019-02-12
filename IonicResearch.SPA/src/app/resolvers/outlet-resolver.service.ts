import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { of } from 'rxjs';
import { OutletForm } from '../models/outlet-form';

@Injectable({
  providedIn: 'root'
})
export class OutletResolverService implements Resolve<any> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot) {
    const outletId = +route.paramMap.get('id');

    if (outletId === 0) {
      return of(new OutletForm());
    } else {
      // todo return from sqlite
    }
  }

}
