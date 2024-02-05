import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModuleRoutingModule } from './user-module-routing.module';
import { UsersComponent } from './list-user/users.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsersComponent, ManageUsersComponent],
  imports: [
    CommonModule,
    UserModuleRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class UserModuleModule { }
