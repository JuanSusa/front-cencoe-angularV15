import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { ListCustomersComponent } from './list-customers/list-customers.component';

const  routes: Routes = [
  { path: '', children:[
    { path:'list-customer', component: ListCustomersComponent},
    { path: '**', redirectTo: 'list-customer'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerModuleRoutingModule { }
