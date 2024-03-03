import { Component, Injectable } from '@angular/core';
import { Campaign, adminTypePopUp } from 'src/app/core/main.type';
import { ManageCampaignsComponent } from '../manage-campaigns/manage-campaigns.component';
import { MatDialog } from '@angular/material/dialog';
import { CampaignsServiceService } from '../services/http/campaigns-service.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-list-campaign',
  templateUrl: './list-campaign.component.html',
  styleUrls: ['./list-campaign.component.scss']
})
export class ListCampaignComponent {
  public campaign: Campaign[] = [];//^1
<<<<<<< HEAD
  public displayedColumns = ['campaign_id','campaign_name','campaign_team', 'campaign_provider','campaign_start_date','campaign_end_date','campaign_observations','campaign_state', 'actions'];//^2
=======
  public displayedColumns = ['campaign_id', 'campaign_name', 'campaign_team', 'campaign_provider', 'campaign_start_date', 'campaign_end_date', 'campaign_observations', 'campaign_state', 'actions'];//^2
>>>>>>> fb630f9d8d8d0d491c4b93720e5c3eec67600be2
  isLoading = true;
  success: boolean = false;
  constructor(
    private readonly _dialog: MatDialog,
    private readonly _campaignHttpService: CampaignsServiceService,
    private http: HttpClient
  ) {
  }
  ngOnInit(): void {
    this.getAllCampaigns()
  }
  getAllCampaigns() {
    this._campaignHttpService.getAllCampaigns().subscribe(data => {
      this.campaign = data;
      console.log(data)
    })
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
<<<<<<< HEAD
  eliminarCampaign(){
=======
  eliminarCampaign() {
>>>>>>> fb630f9d8d8d0d491c4b93720e5c3eec67600be2
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
<<<<<<< HEAD
          text: "El proveedor ha sido eliminado",
=======
          text: "Campaña eliminada",
>>>>>>> fb630f9d8d8d0d491c4b93720e5c3eec67600be2
          confirmButtonColor: "#ff0844",
          icon: "success"
        });
      }
<<<<<<< HEAD
    })

  }
=======
    });
  };

>>>>>>> fb630f9d8d8d0d491c4b93720e5c3eec67600be2
}

/**
 * ^1 => Inyeccion de datos usuarios
 * ^2 => arreglo que define las columnas de la tabla en la vista
 */
