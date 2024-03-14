import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ProviderModuleRoutingModule } from './provider-module-routing.module';
import { ManageProvidersComponent } from './manage-providers/manage-providers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TipodocumentoHttpService } from '../tipodocumento/services/tipo-documento.service';
import { ProvidersComponent } from './list-providers/providers.component';
import { ProviderService } from './services/provider-service.service';
import { AuthServiceService } from 'src/app/auth/services/auth-service.service';
import { GeneralResponseHttpInterceptor } from 'src/app/core/interceptors/general-response.interceptor';
import { HeadersInterceptor } from 'src/app/core/interceptors/headers.interceptor';

@NgModule({
  declarations: [ManageProvidersComponent, ProvidersComponent],
  imports: [
    CommonModule,
    ProviderModuleRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [TipodocumentoHttpService, ProviderService, AuthServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GeneralResponseHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true
    }]
})
export class ProviderModuleModule { }
