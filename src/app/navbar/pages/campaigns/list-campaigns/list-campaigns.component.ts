import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Campaign, adminTypePopUp } from 'src/app/core/main.type';
import { userHttpService } from '../../users/service/http/user-service.service';
import { ManageCampaignsComponent } from '../manage-campaigns/manage-campaigns.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-campaigns',
  templateUrl: './list-campaigns.component.html',
  styleUrls: ['./list-campaigns.component.scss']
})
export class ListCampaignsComponent implements OnInit {
  public campaigns: Campaign[] = [];//^1
  public displayedColumns = ['campaign_id','campaign_name','campaign_capacity','campaign_start_date','campaign_end_date','campaign_observations','campaign_state','acciones'];//^2
  isLoading = true;
  success: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _userHttpService: userHttpService
  ) {

  }
  ngOnInit(): void {
    this.getAllCampaigns()
  }


  getAllCampaigns() {
    this._userHttpService.getAllUsers().subscribe(
      (response) => {

      },
      (error) => {
        console.error('Error al obtener campañas:', error);
      }
    );
  }


  manageCampaigns(tipo: adminTypePopUp, campaign_id?: number) {
    const modal = this._dialog.open(ManageCampaignsComponent, {
      data: { tipo, campo: campaign_id }
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
