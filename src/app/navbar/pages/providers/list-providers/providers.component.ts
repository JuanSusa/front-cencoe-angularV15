import { Component, Inject, OnInit} from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { ManageProvidersComponent } from '../manage-providers/manage-providers.component';
import { adminTypePopUp} from 'src/app/core/main.type';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';
import { ProviderService } from '../services/provider-service.service';
import { Router } from '@angular/router';
import { Provider } from '../core/models/main.model';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {
  mostrarSpinner: boolean = true; // Mostrar Spinner
  loading = true; //spinner de espera y direccionamiento
  titulo= "Proveedores"
  subtitulo = "Proveedores registrados en la aplicación"
  listprovider:Provider[]= [];
  pageSizeOptions: number[] = [3, 10, 25, 100];
  totalItems: number = 0;
  displayedColumns = ["providerId", "providerName", "providerAddress", "providerEmail", "providerContact", "actions"]
  constructor(
    private router: Router,
    private readonly _dialog: MatDialog,
    @Inject(ProviderService) private readonly providerServiceService: ProviderService) {
  }
  ngOnInit() {
    // this.getAllProviders()
    //this.getProvider(2)
  }
  // getAllProviders(page:number =0, size: number=3) {
  //   this.providerService.getAllProviders(page, size)
  //   .subscribe((data :any) =>{
  //     this.listprovider = data.content;
  //     this.totalItems = data.totalElements;
  //     console.log(data)
  //   })
  // }
  onPageChange(event: PageEvent) {
    const page = event.pageIndex; // Índice de la página seleccionada
    const size = event.pageSize; // Tamaño de la página seleccionada
    // this.getAllProviders(page, size); // Obtener los proveedores para la página seleccionada
  }
  eliminarProvider(){
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
            text: "El proveedor ha sido eliminado",
            confirmButtonColor: "#ff0844",
            icon: "success"
          });
        }
      })
    }
  /* Logica para abrir el mat dialog*/
  manageProvider(tipo: adminTypePopUp, providerId?: number) {
    const activeModal = this._dialog.open(ManageProvidersComponent, {
      data: { tipo, campo: providerId },
    })
    activeModal
      .afterClosed()
      .subscribe(result => {
        console.log('Close dialog')
      });
  }
  toggleSpinner() {//mostrar Spinner
    this.mostrarSpinner = !this.mostrarSpinner;
  }
}

