import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Customer, adminTypePopUp } from 'src/app/core/main.type';
import { ManageCustomersComponent } from '../manage-customers/manage-customers.component';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss']
})
export class ListCustomersComponent {

  public customer: Customer[] = []; //^1
  public displayedColumns = ['customerId','customerName','customerAddres','customerPhone','edit']; //^2
  isLoading = true;

  constructor(
    private readonly _dialog: MatDialog
  ){

  }

  manageCustomer(tipo: adminTypePopUp, customerId?: number) {
    const modal = this._dialog.open
    (ManageCustomersComponent, {
      data: {tipo,campo:customerId}
    });
    modal.afterClosed().subscribe(result =>{
      console.log('Se cerro el dialogo')
    });
  }

}
