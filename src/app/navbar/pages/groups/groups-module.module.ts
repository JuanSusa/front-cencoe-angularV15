import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsModuleRoutingModule } from './groups-module-routing.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupsComponent } from './list-group/groups.component';
import { GroupManagerComponent } from './manage-group/group-manager.component';


@NgModule({
  declarations: [GroupsComponent, GroupManagerComponent],
  imports: [
    CommonModule,
    GroupsModuleRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class GroupsModuleModule { }
