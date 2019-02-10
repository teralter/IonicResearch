import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.page.html',
  styleUrls: ['./form-details.page.scss'],
})
export class FormDetailsPage implements OnInit {
  formId: number;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.formId = +this.route.snapshot.paramMap.get('id');
  }

}
