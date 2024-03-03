import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportComponent } from './support-view/support-view.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: 'support-view', component: SupportComponent },
      { path: '**', redirectTo: 'support-view' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
