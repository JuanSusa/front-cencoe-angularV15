import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ManageCampaignsComponent } from './manage-campaigns/manage-campaigns.component';
import { CampaignsModuleRoutingModule } from './campaigns-module-routing.module';
import { ListCampaignComponent } from './list-campaign/list-campaign.component';
import { HttpClientModule } from '@angular/common/http';
import { CampaignsServiceService } from './services/http/campaigns-service.service';
import { GroupServiceService } from '../groups/services/http/group-service.service';
import { ProviderServiceService } from '../providers/services/provider-service.service';

@NgModule({
  declarations: [ManageCampaignsComponent, ListCampaignComponent],
  imports: [
    CommonModule,
    CampaignsModuleRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
//Ver la lista de la campaña
providers: [CampaignsServiceService, GroupServiceService, ProviderServiceService]
})
export class CampaignsModuleModule { }

