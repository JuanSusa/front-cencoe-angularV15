import { Component, Injectable, ViewChild } from '@angular/core';
import { ManageCampaignsComponent } from '../manage-campaigns/manage-campaigns.component';
import { MatDialog } from '@angular/material/dialog';
import { CampaignsServiceService } from '../services/http/campaigns-service.service';
import { HttpClient } from '@angular/common/http';
import { Pageable,  adminTypePopUp } from 'src/app/core/main.type';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable, Subject, map, merge, startWith, switchMap, takeUntil } from 'rxjs';
import { Campaign } from '../core/models/main.model';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-list-campaign',
  templateUrl: './list-campaign.component.html',
  styleUrls: ['./list-campaign.component.scss']
})
export class ListCampaignComponent {

  private _clearSubscritions$ = new Subject<void>();
  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  totalResultados: number = 0;

  mostrarSpinner: boolean = true; // Mostrar Spinner
  public campaign: Campaign[] = [];//^1
  public displayedColumns = ['campaign_id', 'campaign_name', 'campaign_team', 'campaign_provider', 'campaign_start_date', 'campaign_end_date', 'campaign_observations', 'campaign_state', 'actions'];//^2
  isLoading = true;
  success: boolean = false;
  constructor(
    private readonly _dialog: MatDialog,
    private readonly _campaignHttpService: CampaignsServiceService,
    private http: HttpClient,
    private router: Router,
    private paginator2: MatPaginatorIntl
  ) {
    this.paginator2.itemsPerPageLabel = 'Registros por página';
    this.paginator2.nextPageLabel = 'Siguiente';
    this.paginator2.previousPageLabel = 'Anterior';
  }
  ngOnInit(): void {
   // this.getAllCampaigns()
  }

  ngAfterViewInit(): void {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this._campaignHttpService.getAllCampaings(
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        }),
        map((response:Pageable<Campaign>) => {
          this.totalResultados = response.totalElements;
          // this.totalPages = response.data.totalPages;
          return response.content;
        }),
        takeUntil(this._clearSubscritions$)

      )
      .subscribe((data) => {
        this.campaign = data;
        console.log(data);
      });
  }

  manageCampaign(tipo: adminTypePopUp, id?: number) {
    const modal = this._dialog.open(ManageCampaignsComponent, {
      data: { tipo, campo: id },
    });
    modal
      .afterClosed()
      .subscribe(result => {
        console.log('se cerro el dialogo ')
      });
  }
  eliminarCampaign() {
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
          text: "Campaña eliminada",
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
/**
 * ^1 => Inyeccion de datos usuarios
 * ^2 => arreglo que define las columnas de la tabla en la vista
 */
