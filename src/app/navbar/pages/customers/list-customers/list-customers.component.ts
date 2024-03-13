import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pageable, adminTypePopUp } from 'src/app/core/main.type';
import { ManageCustomersComponent } from '../manage-customers/manage-customers.component';
import { CustomerServiceService } from '../service/http/customer-service.service';
import { Observable, Subject, map, merge, startWith, switchMap, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Customer } from '../core/models/main.model';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss']
})
export class ListCustomersComponent {

  private _clearSubscritions$ = new Subject<void>();
  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  public customer: Customer[] = [];
  public displayedColumns = ['customerId', 'customerName', 'customerAddress', 'customerPhone', 'edit'];
  totalResultados: number = 0;

  isLoading = true;
  mostrarSpinner: boolean = false;

  constructor(
    private readonly _dialog: MatDialog,
    private _customerService: CustomerServiceService,
    private paginator2: MatPaginatorIntl,
    private router: Router
  ) {
    this.paginator2.itemsPerPageLabel = 'Registros por página';
    this.paginator2.nextPageLabel = 'Siguiente';
    this.paginator2.previousPageLabel = 'Anterior';
  }

  manageCustomer(tipo: adminTypePopUp, customerId?: number) {
    const modal = this._dialog.open(ManageCustomersComponent, {
      data: { tipo, campo: customerId },
    });
    modal.afterClosed().subscribe(result => {
      console.log('Se cerro el dialogo')
    });
  }
  ngOnInit() {
  
  }

  ngAfterViewInit(): void {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this._customerService.getAllCustomers(
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        }),
        map((response:Pageable<Customer>) => {
          this.totalResultados = response.totalElements;
          // this.totalPages = response.data.totalPages;
          return response.content;
        }),
        takeUntil(this._clearSubscritions$)

      )
      .subscribe((data) => {
        this.customer = data;
        console.log(data);
      });
  }

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