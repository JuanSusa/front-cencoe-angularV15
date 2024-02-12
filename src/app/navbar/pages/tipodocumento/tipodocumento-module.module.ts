import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipodocumentoModuleRoutingModule } from './tipodocumento-module-routing.module';
import { TipodocumentoComponent } from './manage-tipodocumento/tipodocumento.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TipodocumentoHttpService } from './services/tipo-documento.service';


@NgModule({
  declarations: [TipodocumentoComponent],
  imports: [
    CommonModule,
    TipodocumentoModuleRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers:[
    TipodocumentoHttpService
  ]
})
export class TipodocumentoModuleModule { }
