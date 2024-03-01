import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './list-group/groups.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-group',
        component: GroupsComponent
      },
      { path: '**', redirectTo: 'list-group' }
    ]
  }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes),  CommonModule],
  exports: [RouterModule]
})
export class GroupsModuleRoutingModule { }
