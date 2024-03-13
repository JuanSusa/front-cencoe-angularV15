import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ManageCampaignsComponent } from './manage-campaigns/manage-campaigns.component';
import { CampaignsModuleRoutingModule } from './campaigns-module-routing.module';
import { ListCampaignComponent } from './list-campaign/list-campaign.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CampaignsServiceService } from './services/http/campaigns-service.service';
import { GroupServiceService } from '../groups/services/http/group-service.service';
import { ProviderService } from '../providers/services/provider-service.service';
import { GeneralResponseHttpInterceptor } from 'src/app/core/interceptors/general-response.interceptor';
import { HeadersInterceptor } from 'src/app/core/interceptors/headers.interceptor';

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
providers: [
  CampaignsServiceService, 
  GroupServiceService, 
  ProviderService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: GeneralResponseHttpInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HeadersInterceptor,
    multi: true
  },]
})
export class CampaignsModuleModule { }

