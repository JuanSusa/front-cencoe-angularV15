import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoleComponent } from './role.component';
import { RoleModuleRoutingModule } from './role-routing';

@NgModule({
  declarations: [RoleComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    RoleModuleRoutingModule
  ],
  providers:[
  ]
})
export class RoleModule { }
