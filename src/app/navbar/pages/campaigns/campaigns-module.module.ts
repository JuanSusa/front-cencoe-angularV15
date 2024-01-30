import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignsModuleRoutingModule } from './campaigns-module-routing.module';
import { CampaignsComponent } from './campaigns.component';


@NgModule({
  declarations: [CampaignsComponent],
  imports: [
    CommonModule,
    CampaignsModuleRoutingModule
  ]
})
export class CampaignsModuleModule { }
