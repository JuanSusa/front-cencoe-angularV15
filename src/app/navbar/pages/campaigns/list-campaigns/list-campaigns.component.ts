import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Campaigns, adminTypePopUp } from 'src/app/core/main.type';
import { ManageCampaignsComponent } from '../manage-campaigns/manage-campaigns.component';


@Component({
  selector: 'app-list-campaigns',
  templateUrl: './list-campaigns.component.html',
  styleUrls: ['./list-campaigns.component.scss']
})
export class ListCampaignsComponent {

  public customer: Campaigns[] = []; //^1
  public displayedColumns = ['campaign_id','campaign_name','campaign_capacity','campaign_start_date','campaign_end_date','campaign_observations','campaign_state']; //^2
  isLoading = true;

  constructor(
    private readonly _dialog: MatDialog
  ){

  }

  manageCustomer(tipo: adminTypePopUp, campaign_id?: number) {
    const modal = this._dialog.open
    (ManageCampaignsComponent, {
      data: {tipo,campo:campaign_id}
    });
    modal.afterClosed().subscribe(result =>{
      console.log('Se cerro el dialogo')
    });
  }

}
