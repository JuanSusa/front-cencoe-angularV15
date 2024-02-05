import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { AngularMaterialModule } from '../angular-material.module';
import { CampaignComponent } from './pages/campaigns/campaigns.component';
import { ProvidersComponent } from './pages/providers/list-providers/providers.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { UsersComponent } from './pages/users/list-user/users.component';
import { TipodocumentoComponent } from './pages/tipodocumento/manage-tipodocumento/tipodocumento.component';
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
