import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCampaignComponent } from './list-campaign/list-campaign.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-campaign',
        component: ListCampaignComponent
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
