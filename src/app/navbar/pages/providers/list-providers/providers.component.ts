import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ManageProvidersComponent } from '../manage-providers/manage-providers.component';
import { Provider, adminTypePopUp } from 'src/app/core/main.type';
import { ProviderServiceService } from '../services/provider-service.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit{
 listprovider: Provider[] = []
 displayedColumns= ['id', 'name', 'addres', 'email', 'contact', 'state']
z

  constructor(
    private readonly _dialog: MatDialog,
    private _providerService: ProviderServiceService
      
  ){
    
  }
  ngOnInit() {
    this.getAllProviders()
    //this.getProvider(2)
  }

  getAllProviders() {
    this._providerService.getAllProviders().subscribe(
      (response) => {
        this.listprovider = response
      }
    )
  }

  getProvider(id: number) {
    this._providerService.getProvider(id).subscribe(response =>{

      console.log(response)
    })

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

  