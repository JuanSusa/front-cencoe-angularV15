import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ManageProvidersComponent } from '../manage-providers/manage-providers.component';
import { Provider, adminTypePopUp } from 'src/app/core/main.type';



@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent {
 public provider: Provider[]= []
 public displayedColumns = ['providerId', 'providerName', 'providerAdrees', 'providerEmail', 'providerContact', 'providerState']


  constructor(
    private readonly _dialog: MatDialog
  ){

  }

  manageProvider(tipo: adminTypePopUp, providerId?: number){
    const activeModal =  this._dialog.open(ManageProvidersComponent, {
      data: {tipo, campo: providerId}
    })
        activeModal
      .afterClosed()
      .subscribe(result => {
        console.log('Close dialog')
      });

  }
}
   

  