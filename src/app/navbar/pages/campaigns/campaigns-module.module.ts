import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ManageCampaignsComponent } from './manage-campaigns/manage-campaigns.component';
import { CampaignsModuleRoutingModule } from './campaigns-module-routing.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { userHttpService } from '../users/service/http/user-service.service';
import { ListCampaignsComponent } from './list-campaigns/list-campaigns.component';


@NgModule({
  declarations: [ListCampaignsComponent, ManageCampaignsComponent],
  imports: [
    CommonModule,
    CampaignsModuleRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers:[
    userHttpService
  ]
})
export class CampaignsModuleModule { }
