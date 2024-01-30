import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipodocumentoComponent } from './manage-tipodocumento/tipodocumento.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'tipo-documento',
        component: TipodocumentoComponent
      },
      { path: '**', redirectTo: 'tipo-documento' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipodocumentoModuleRoutingModule { }
