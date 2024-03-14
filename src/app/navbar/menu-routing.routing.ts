import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { LoginComponent } from '../auth/login/login.component';
import { ManageProvidersComponent } from './pages/providers/manage-providers/manage-providers.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'campañas',
    component: NavbarComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/campaigns/campaigns-module.module').then((m) => m.CampaignsModuleModule)
  },
  {
    path: 'clientes',
    component: NavbarComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/customers/customer-module.module').then((m) => m.CustomerModuleModule)
  },
  {
    path: 'proveedores',
    component: NavbarComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/providers/provider-module.module').then((m) => m.ProviderModuleModule)
  },
  {
    path: 'usuarios',
    component: NavbarComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/users/user-module.module').then((m) => m.UserModuleModule)
  },
  {
    path: 'tipo-documento',
    component: NavbarComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/tipodocumento/tipodocumento-module.module').then((m) => m.TipodocumentoModuleModule)
  },
  {
    path: 'role',
    component: NavbarComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/role/role-module.module').then((m) => m.RoleModule)
  },
  {
  path: 'reports',
  component: NavbarComponent,
  canActivate: [AuthGuard],
  loadChildren: () => import('./pages/reports/reports-module.module').then((m) => m.ReportsModuleModule)
  },
  {
  path: 'grupos',
    component: NavbarComponent,
    canActivate: [AuthGuard],
      loadChildren: () => import('./pages/groups/groups-module.module').then((m) => m.GroupsModuleModule)

  },
  {
    path: 'soporte',
    component: NavbarComponent,
    canActivate: [AuthGuard],
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
