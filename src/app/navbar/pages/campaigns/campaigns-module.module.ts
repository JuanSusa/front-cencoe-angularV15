import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignsModuleRoutingModule } from './campaigns-module-routing.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CrearCampaignComponent } from './crear-campaign/crear-campaign.component';
import { EditarCampaignComponent } from './editar-campaign/editar-campaign.component';
import { CampaignComponent } from './campaigns.component';



@NgModule({
  declarations: [
    CrearCampaignComponent,
    EditarCampaignComponent,
    CampaignComponent
  ],
  imports: [
    CommonModule,
    CampaignsModuleRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ]
})
export class CampaignsModuleModule { }
