import { Component, OnInit } from '@angular/core';
import { OutletForm } from 'src/app/entities/outlet-form';
import { DbService } from 'src/app/services/db.service';
import { getRepository, Repository } from 'typeorm';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.page.html',
  styleUrls: ['./forms.page.scss'],
})
export class FormsPage implements OnInit {
  forms: OutletForm[];

  constructor(
    private dbService: DbService
  ) {
    this.dbService.databaseReady.subscribe(async state => {
      if (state) {
        const formRepository = getRepository('OutletForm') as Repository<OutletForm>;
        this.forms = await formRepository.find();
      }
    });
  }

  ngOnInit() {
  }

}
