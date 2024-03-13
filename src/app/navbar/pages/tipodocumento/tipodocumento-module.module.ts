import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipodocumentoModuleRoutingModule } from './tipodocumento-module-routing.module';
import { TipodocumentoComponent } from './manage-tipodocumento/tipodocumento.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TipodocumentoHttpService } from './services/tipo-documento.service';
import { userHttpService } from '../users/service/http/user-service.service';
import { GeneralResponseHttpInterceptor } from 'src/app/core/interceptors/general-response.interceptor';


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
    TipodocumentoHttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GeneralResponseHttpInterceptor,
      multi: true
    }
  ]
})
export class TipodocumentoModuleModule { }
