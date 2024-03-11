import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { LoginComponent } from '../auth/login/login.component';
import { ManageProvidersComponent } from './pages/providers/manage-providers/manage-providers.component';

const routes: Routes = [
  
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule)
  },
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
    path: 'role',
    component: NavbarComponent,
    loadChildren: () => import('./pages/role/role.module').then((m) => m.RoleModule)
  },
  {
  path: 'reports',
  component: NavbarComponent,
  loadChildren: () => import('./pages/reports/reports-module.module').then((m) => m.ReportsModuleModule)
  },
  {
  path: 'grupos',
    component: NavbarComponent,
      loadChildren: () => import('./pages/groups/groups-module.module').then((m) => m.GroupsModuleModule)

  },
  {
    path: 'soporte',
    component: NavbarComponent,
    loadChildren: () => import('./pages/support/support.module').then((m) => m.SupportModule)
  },
  {path:'', redirectTo:'login', pathMatch:'full'}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class MenuRoutingRoutes { }
