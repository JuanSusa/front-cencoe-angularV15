import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReportsComponent } from './list-reports/reports.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule, 

  ]
})
export class ReportsModuleModule { }
