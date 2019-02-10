import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'forms',
        loadChildren: '../forms/forms.module#FormsPageModule'
      },
      {
        path: 'forms/:id',
        loadChildren: '../form-details/form-details.module#FormDetailsPageModule'
      },
      {
        path: 'route',
        loadChildren: '../route/route.module#RoutePageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/forms',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
