import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerModuleRoutingModule } from './customer-module-routing.module';
import { ListCustomersComponent } from './list-customers/list-customers.component';
import { ManageCustomersComponent } from './manage-customers/manage-customers.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CustomerServiceService } from './service/http/customer-service.service';
import { TipodocumentoHttpService } from '../tipodocumento/services/tipo-documento.service';
import { HeadersInterceptor } from 'src/app/core/interceptors/headers.interceptor';
@NgModule({
  declarations: [
    ListCustomersComponent,
    ManageCustomersComponent
  ],
  imports: [
    CommonModule,
    CustomerModuleRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [CustomerServiceService, TipodocumentoHttpService,  {
    provide: HTTP_INTERCEPTORS,
    useClass: HeadersInterceptor,
    multi: true
  }]
})
export class CustomerModuleModule { }
