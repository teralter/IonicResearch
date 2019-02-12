import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'lodash';

import { OutletForm } from 'src/app/models/outlet-form';
import { OutletType } from 'src/app/models/outlet-type';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.page.html',
  styleUrls: ['./form-details.page.scss'],
})
export class FormDetailsPage implements OnInit {
  title: string;
  segement: string;
  outletForm: FormGroup;
  monthNames: string[];
  ouletTypes: OutletType[];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private geolocation: Geolocation
  ) { }

  ngOnInit() {
    const outlet: OutletForm = this.route.snapshot.data['outlet'];
    this.title = outlet.id !== 0 ? 'Новая анкета' : 'Редактирование анкеты';
    this.segement = 'form';
    this.monthNames = _.map(moment.localeData('ru').months(), x => x.charAt(0).toUpperCase() + x.slice(1));
    this.ouletTypes = [
      { id: 1, name: 'Гипермаркет' },
      { id: 2, name: 'Киоск' },
      { id: 3, name: 'Хорека' },
      { id: 4, name: 'Пивнушка' },
      { id: 5, name: 'Рынок' }
    ];

    this.outletForm = this.formBuilder.group({
      repDate: [moment.utc().startOf('day').toDate().toJSON(), [Validators.required]],
      name: ['', [Validators.required]],
      inn: ['', [Validators.required, Validators.pattern('^([0-9]{10}|[0-9]{12})$')]],
      address: ['', [Validators.required]],
      typeId: [null, [Validators.required]],
      openingTime: [null, [Validators.required]],
      coords: [null]
    });
  }

  onGetCoords() {
    this.geolocation.getCurrentPosition().then((pos) => {
      this.outletForm.patchValue({ coords: [pos.coords.latitude, pos.coords.longitude] });
    }).catch((error) => {
      // todo alert
    });
  }

  onSubmit() {

  }

}
