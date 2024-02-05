import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { AngularMaterialModule } from '../angular-material.module';
import { MenuRoutingRoutes } from './menu-routing.routing';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    MenuRoutingRoutes
  ]
})
export class NavbarModuleModule { }
