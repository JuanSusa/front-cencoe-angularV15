import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvidersComponent } from './list-providers/providers.component';


const routes: Routes = [
  {
    path:'',
    children: [
      {
        path:'list-provider',
        component: ProvidersComponent
      },
      { path: '**', redirectTo: 'list-provider' }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderModuleRoutingModule { }
