import { Component, Injectable } from '@angular/core';
import { Campaign, adminTypePopUp } from 'src/app/core/main.type';
import { ManageCampaignsComponent } from '../manage-campaigns/manage-campaigns.component';
import { MatDialog } from '@angular/material/dialog';
import { CampaignsServiceService } from '../services/http/campaigns-service.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-list-campaign',
  templateUrl: './list-campaign.component.html',
  styleUrls: ['./list-campaign.component.scss']
})
export class ListCampaignComponent {
  mostrarSpinner: boolean = true; // Mostrar Spinner
  public campaign: Campaign[] = [];//^1
  public displayedColumns = ['campaign_id', 'campaign_name', 'campaign_team', 'campaign_provider', 'campaign_start_date', 'campaign_end_date', 'campaign_observations', 'campaign_state', 'actions'];//^2
  isLoading = true;
  success: boolean = false;
  constructor(
    private readonly _dialog: MatDialog,
    private readonly _campaignHttpService: CampaignsServiceService,
    private http: HttpClient,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    // this.getAllCampaigns()
  }
  // getAllCampaigns() {
  //   this._campaignHttpService.getAllCampaigns().subscribe(data => {
  //     this.campaign = data;
  //     console.log(data)
  //   })
  // }
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
