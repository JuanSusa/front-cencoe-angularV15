import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CampaignService } from 'src/app/services/campaign.service';
import { EditarCampaignComponent } from './editar-campaign/editar-campaign.component';
import { CrearCampaignComponent } from './crear-campaign/crear-campaign.component';
import { Campaign } from 'src/app/interfaces/campaign';




@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignComponent implements OnInit {

  listCampaign: Campaign[] = [];

  displayedColumns: string[] = ['campaign_id','campaign_name','campaign_capacity','campaign_start_date','campaign_end_date','campaign_observations','campaign_state','acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( public dialog: MatDialog, private _campaignService: CampaignService, private _snackBar: MatSnackBar){}

  ngOnInit():void{
    this.cargarCampaign();
  }

  cargarCampaign(){
    this.listCampaign = this._campaignService.getCampaign();
    this.dataSource = new MatTableDataSource(this.listCampaign)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  verCampaign(index: number){
    console.log (index);

  }

  crearCampaign(){
    const dialogRef = this.dialog.open(CrearCampaignComponent, {
      width: "100%",
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');//el dialogo fue cerrado

    });
  }

  editarCampaign(index?: number){
    const dialogRef = this.dialog.open(EditarCampaignComponent, {
      width: '60%',//tamaño de la ventana emergente
      disableClose: true,
      data: {index: index}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');//el dialogo fue cerrado

    });
  }
  eliminarCampaign(index: number){
    console.log (index);

    this._campaignService.eliminarCampaign(index);
    this.cargarCampaign();

    this._snackBar.open('La campaña fue eliminada con exito','',{
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });


  }
}

