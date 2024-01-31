import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './list-user/users.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-users',
        component: UsersComponent
      },
      { path: '**', redirectTo: 'list-users' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserModuleRoutingModule { }
