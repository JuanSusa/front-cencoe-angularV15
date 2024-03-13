import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ProviderModuleRoutingModule } from './provider-module-routing.module';
import { ManageProvidersComponent } from './manage-providers/manage-providers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TipodocumentoHttpService } from '../tipodocumento/services/tipo-documento.service';
import { ProvidersComponent } from './list-providers/providers.component';
import { ProviderService } from './services/provider-service.service';

@NgModule({
  declarations: [ManageProvidersComponent, ProvidersComponent],
  imports: [
    CommonModule,
    ProviderModuleRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [TipodocumentoHttpService, ProviderService]
})
export class ProviderModuleModule { }
