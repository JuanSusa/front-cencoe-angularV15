import { AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { ManageProvidersComponent } from '../manage-providers/manage-providers.component';
import { Pageable, TypeDocs, adminTypePopUp} from 'src/app/core/main.type';
import Swal from 'sweetalert2';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { ProviderService } from '../services/provider-service.service';
import { Router } from '@angular/router';
import { Subject, map, merge, startWith, switchMap, takeUntil } from 'rxjs';
import { Provider } from '../core/models/main.model';
import { TipodocumentoComponent } from '../../tipodocumento/manage-tipodocumento/tipodocumento.component';
import { TipodocumentoHttpService } from '../../tipodocumento/services/tipo-documento.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements AfterViewInit {
  private _clearSubscritions$ = new Subject<void>();
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  public provider: Provider[] = [];
  mostrarSpinner: boolean = true; // Mostrar Spinner
  loading = true; //spinner de espera y direccionamiento
  titulo= "Proveedores"
  subtitulo = "Proveedores registrados en la aplicación"
  // listprovider:Provider[]= [];

  totalItems: number = 0;
  displayedColumns = ["providerId", "providerName", "providerAddress", "providerEmail", "providerContact", "actions"]
  totalResultados: number = 0;
  constructor(
    private router: Router,
    private readonly _dialog: MatDialog,
    private readonly providerServiceService: ProviderService,
    private readonly _TipodocumentoHttpService: TipodocumentoHttpService,
    private paginator2: MatPaginatorIntl
    ) {

      this.paginator2.itemsPerPageLabel = 'Registros por página';
      this.paginator2.nextPageLabel = 'Siguiente';
      this.paginator2.previousPageLabel = 'Anterior';
  }
  ngAfterViewInit(): void {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.providerServiceService.getAllProviders(
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        }),
        map((response:Pageable<Provider>) => {
          this.totalResultados = response.totalElements;
          // this.totalPages = response.data.totalPages;
          return response.content;
        }),
        takeUntil(this._clearSubscritions$)

      )
      .subscribe((data) => {
        this.provider = data;
        console.log(data);
      });
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
        confirmButtonColor: "#e0062c",
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

