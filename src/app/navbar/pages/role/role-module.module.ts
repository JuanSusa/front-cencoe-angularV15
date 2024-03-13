import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoleComponent } from './component/role.component';
import { RoleModuleRoutingModule } from './role-routing.module';
import { userHttpService } from '../users/service/http/user-service.service';
import { TipodocumentoHttpService } from '../tipodocumento/services/tipo-documento.service';
import { RoleServiceHttpService } from './services/role-service-http.service';

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
    RoleServiceHttpService
  ]
})
export class RoleModule { }
