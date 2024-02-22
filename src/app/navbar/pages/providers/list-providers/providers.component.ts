import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ManageProvidersComponent } from '../manage-providers/manage-providers.component';
import { Provider, adminTypePopUp, ReqResponse } from 'src/app/core/main.type';
import { ProviderServiceService } from '../services/provider-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {
  titulo= "Proveedores"
  subtitulo = "Proveedores registrados en la aplicación"

  listprovider: Provider[]=[];
  displayedColumns = ["providerId", "providerName", "providerAddress", "providerEmail", "providerContact", "providerState"]
  //  dataSource! : MatTableDataSource<Provider>

  constructor(
    private readonly _dialog: MatDialog,
    private readonly providerService: ProviderServiceService ) {

  }

  ngOnInit() {
    this.getAllProviders()
    //this.getProvider(2)
  }
  getAllProviders() {
    this.providerService.getAllProviders().subscribe(data =>{
      this.listprovider = data;
      console.log(data)
    })
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
      data: { tipo, campo: providerId }
    })
    activeModal
      .afterClosed()
      .subscribe(result => {
        console.log('Close dialog')
      });

  }
  
  // getProvider(id: number) {
  //   this.providerService.getProvider(id).subscribe(response => {

  //     console.log(response)
  //   })

  // }

}

