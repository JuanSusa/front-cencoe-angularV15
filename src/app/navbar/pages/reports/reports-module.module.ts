import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageReportsComponent } from './manage-reports/manage-reports.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReportsComponent } from './list-reports/reports.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    ManageReportsComponent,
    ReportsComponent
    

  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    MatFormFieldModule,

  ]
})
export class ReportsModuleModule { }
