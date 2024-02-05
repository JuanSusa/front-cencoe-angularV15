import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/angular-material.module';


import { ProviderModuleRoutingModule } from './provider-module-routing.module';
import { ProvidersComponent } from './list-providers/providers.component';
import { ManageProvidersComponent } from './manage-providers/manage-providers.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProvidersComponent, ManageProvidersComponent],
  imports: [
    CommonModule,
    ProviderModuleRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class ProviderModuleModule { }
