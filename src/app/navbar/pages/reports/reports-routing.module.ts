import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './list-reports/reports.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-reports',
        component: ReportsComponent
      },
      { path: '**', redirectTo: 'list-reports' }
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes),  CommonModule],
  exports: [RouterModule]
}
)

export class ReportsRoutingModule { }
