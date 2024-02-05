import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModuleRoutingModule } from './user-module-routing.module';
import { UsersComponent } from './list-user/users.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { userHttpService } from './service/http/user-service.service';


@NgModule({
  declarations: [UsersComponent, ManageUsersComponent],
  imports: [
    CommonModule,
    UserModuleRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers:[
    userHttpService
  ]
})
export class UserModuleModule { }
