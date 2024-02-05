import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignsModuleModule } from './campaigns-module.module';
import { CampaignComponent } from './campaigns.component';




const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'campaigns',
        component: CampaignComponent
      },
      { path: '**', redirectTo: 'list-campaign' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignsModuleRoutingModule { }
