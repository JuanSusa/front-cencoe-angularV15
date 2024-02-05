import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipodocumentoModuleRoutingModule } from './tipodocumento-module-routing.module';
import { TipodocumentoComponent } from './manage-tipodocumento/tipodocumento.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [TipodocumentoComponent],
  imports: [
    CommonModule,
    TipodocumentoModuleRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class TipodocumentoModuleModule { }
