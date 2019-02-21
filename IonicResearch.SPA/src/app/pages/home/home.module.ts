import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { OutletFormResolverService } from 'src/app/resolvers/outlet-form-resolver.service';
import { OutletTypesResolverService } from 'src/app/resolvers/outlet-types-resolver.service';

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
        resolve: {
          outletForm: OutletFormResolverService,
          outletTypes: OutletTypesResolverService
        },
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
