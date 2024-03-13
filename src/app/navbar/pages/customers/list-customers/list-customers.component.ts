import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { adminTypePopUp } from 'src/app/core/main.type';
import { ManageCustomersComponent } from '../manage-customers/manage-customers.component';
import { CustomerServiceService } from '../service/http/customer-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss']
})
export class ListCustomersComponent {
  public customer  = []; //^1 Customer[]
  public displayedColumns = ['customerId', 'customerName', 'customerAddress', 'customerPhone', 'edit']; //^2
  isLoading = true;
  constructor(
    private location: Location,
    private readonly _dialog: MatDialog,
    private _customerService: CustomerServiceService,
    private router: Router
  ) { }

  manageCustomer(tipo: adminTypePopUp, customerId?: number) {
    const modal = this._dialog.open(ManageCustomersComponent, {
      data: { tipo, campo: customerId },
    });
    modal.afterClosed().subscribe(result => {
      console.log('Se cerro el dialogo')
    });
  }
  ngOnInit() {
    // this.getAllCustomers()
  }
  // getAllCustomers() {
  //   this._customerService.getAllCustomers().subscribe(data => {
  //     this.customer = data;
  //     console.log(data)
  //   })
  // }
  eliminarCustomer() {
    Swal.fire({
      title: "¿Esta seguro de eliminar este registro?",
      text: "Esta operacion es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff0844",
      cancelButtonColor: "rgb(2,0,36)",
      confirmButtonText: "Si, confirmar!",
      cancelButtonText: "No, cancelar!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminado",
          text: "El cliente ha sido eliminado",
          confirmButtonColor: "#ff0844",
          icon: "success"
        });
      }
    });
  };
  toggleSpinner() {//mostrar Spinner
    this.mostrarSpinner = !this.mostrarSpinner;
  }
}
