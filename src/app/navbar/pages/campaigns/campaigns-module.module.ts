import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ManageCampaignsComponent } from './manage-campaigns/manage-campaigns.component';
import { CampaignsModuleRoutingModule } from './campaigns-module-routing.module';
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

})
export class CampaignsModuleModule { }
