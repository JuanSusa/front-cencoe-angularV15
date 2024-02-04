import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { GroupsComponent } from './pages/groups/list-group/groups.component';


const routes: Routes = [
  {
    path: 'campañas',
    component: NavbarComponent,
    loadChildren: () => import('./pages/campaigns/campaigns-module.module').then((m) => m.CampaignsModuleModule)
  },
  {
    path: 'clientes',
    component: NavbarComponent,
    loadChildren: () => import('./pages/customers/customer-module.module').then((m) => m.CustomerModuleModule)
  },
  {
    path: 'proveedores',
    component: NavbarComponent,
    loadChildren: () => import('./pages/providers/provider-module.module').then((m) => m.ProviderModuleModule)
  },
  {
    path: 'usuarios',
    component: NavbarComponent,
    loadChildren: () => import('./pages/users/user-module.module').then((m) => m.UserModuleModule)
  },
  {
    path: 'tipo-documento',
    component: NavbarComponent,
    loadChildren: () => import('./pages/tipodocumento/tipodocumento-module.module').then((m) => m.TipodocumentoModuleModule)
  },
  {
    path: 'grupos', 
    component: NavbarComponent,
    loadChildren: () => import('./pages/groups/groups-module.module').then((m) => m.GroupsModuleModule)

  },
  {path:'', redirectTo:'campañas', pathMatch:'full'}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class MenuRoutingRoutes {}
