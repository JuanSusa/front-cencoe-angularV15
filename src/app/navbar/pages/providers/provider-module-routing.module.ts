import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvidersComponent } from './list-providers/providers.component';
const routes: Routes = [
  {
    path:'',
    children: [
      {
        path:'proveedor',
        component: ProvidersComponent
      },
      { path: '**', redirectTo: 'proveedor' }
    ]

  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderModuleRoutingModule { }
