import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCampaignsComponent } from './list-campaigns/list-campaigns.component';

const routes: Routes = [ {
  path: '',
  children: [
    {
      path: 'list-campaigns',
      component: ListCampaignsComponent
    },
    { path: '**', redirectTo: 'list-campaigns' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignsModuleRoutingModule { }
