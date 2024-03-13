import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './component/role.component';

const routes: Routes = [
  {
    path:'',
    children: [
      {
        path:'role',
        component: RoleComponent
      },
      { path: '**', redirectTo: 'role' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleModuleRoutingModule { }