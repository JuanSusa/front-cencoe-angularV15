import { Component } from '@angular/core';
import { Campaign, adminTypePopUp } from 'src/app/core/main.type';
import { ManageCampaignsComponent } from '../manage-campaigns/manage-campaigns.component';
import { MatDialog } from '@angular/material/dialog';
import { CampaignsServiceService } from '../service/http/campaigns-service.service';

@Component({
  selector: 'app-list-campaign',
  templateUrl: './list-campaign.component.html',
  styleUrls: ['./list-campaign.component.scss']
})
export class ListCampaignComponent {
  public campaign: Campaign[] = [];//^1
  public displayedColumns = ['campaign_id','campaign_name','campaign_capacity','campaign_start_date','campaign_end_date','campaign_observations','campaign_state'];//^2
  isLoading = true;
  success: boolean = false;

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _campaignHttpService: CampaignsServiceService
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
      data: { tipo, campo: id }
    });

    modal
      .afterClosed()
      .subscribe(result => {
        console.log('se cerro el dialogo ')
      });

  }
}


/**
 * ^1 => Inyeccion de datos usuarios
 * ^2 => arreglo que define las columnas de la tabla en la vista
 */
