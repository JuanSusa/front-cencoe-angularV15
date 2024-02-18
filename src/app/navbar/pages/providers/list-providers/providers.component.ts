import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ManageProvidersComponent } from '../manage-providers/manage-providers.component';
import { Provider, adminTypePopUp} from 'src/app/core/main.type';
import { Subject, takeUntil } from 'rxjs';
import { ProviderServiceService } from '../services/provider-service.service';



@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {
  titulo= "Proveedores"
  subtitulo = "Proveedores registrados en la aplicación"

  listprovider: Provider[]=[]
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

  // }

  // getAllProviders() {
  //   this.providerService.getAllProviders().subscribe(
  //     (response) => {

  //     },
  //     (error) => {
  //       console.error('Error al obtener usuarios:', error);
  //     }
  //   );
  // }



  // getProvider(id: number) {
  //   this.providerService.getProvider(id).subscribe(response => {

  //     console.log(response)
  //   })

  // }


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

}

