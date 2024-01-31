import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User, adminTypePopUp } from 'src/app/core/main.type';
import { ManageUsersComponent } from '../manage-users/manage-users.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  public user: User[] = [];//^1
  public displayedColumns = ['userId', 'name', 'direccion', 'email', 'edit'];//^2
  isLoading = true;

  constructor(
    private readonly _dialog: MatDialog
  ){

  }


  manageUser(tipo: adminTypePopUp, userId?: number) {
    const modal = this._dialog.open(ManageUsersComponent, {
      data: { tipo, campo: userId }
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