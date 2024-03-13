import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { AngularMaterialModule } from '../angular-material.module';
import { MenuRoutingRoutes } from './menu-routing.routing';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { AuthServiceService } from '../auth/services/auth-service.service';





@NgModule({
  declarations: [
    NavbarComponent
    
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    MenuRoutingRoutes
  ],
  providers: [AuthServiceService, JwtHelperService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }]
})
export class NavbarModuleModule { }
