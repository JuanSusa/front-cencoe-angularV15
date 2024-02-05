import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignsModuleModule } from './campaigns-module.module';




const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'campaigns',
        component: CampaignsModuleModule
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
