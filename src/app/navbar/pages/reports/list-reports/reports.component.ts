import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { adminTypePopUp, reports } from 'src/app/core/main.type';
import { HttpClient } from '@angular/common/http';
import { ManageReportsComponent } from '../manage-reports/manage-reports.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  public report: reports[] = [];
  public displayedColumns = ['reportsId', 'reportsName', 'edit'];
  isLoading = true;
  success: boolean = false;

  constructor(
    private readonly _dialog: MatDialog,
    // private http: HttpClient
  ){

  }
  ngOnInit(): void {
    
  }
 
  manageReports(tipo: adminTypePopUp, id?: number) {
    const modal = this._dialog.open(ManageReportsComponent, {
      data: { tipo, campo: id }
    });
    modal
      .afterClosed()
      .subscribe(result => {
        console.log('se cerro el dialogo ')
      });
  }
}
