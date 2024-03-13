import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModuleRoutingModule } from './user-module-routing.module';
import { UsersComponent } from './list-user/users.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { userHttpService } from './service/http/user-service.service';
import { TipodocumentoHttpService } from '../tipodocumento/services/tipo-documento.service';
import { GeneralResponseHttpInterceptor } from 'src/app/core/interceptors/general-response.interceptor';


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
    userHttpService,
    TipodocumentoHttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GeneralResponseHttpInterceptor,
      multi: true
    }
  ]
})
export class UserModuleModule { }
