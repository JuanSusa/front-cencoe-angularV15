
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Team, adminTypePopUp } from 'src/app/core/main.type';
import {GroupManagerComponent} from '../../groups/manage-group/group-manager.component';

@Component({
  selector: 'app-select-group',
  templateUrl: './select-group.component.html',
  styleUrls: ['./select-group.component.scss']
})
export class SelectGroupComponent {
  public group: Team[] = [];//^1
  public displayedColumns = ['groupName'];//^2
  isLoading = true;
  success: boolean = false;

  constructor(
    private readonly _dialog: MatDialog
  ){

  }


  manageGroup(tipo: adminTypePopUp, groupId?: number) {
    const modal = this._dialog.open(GroupManagerComponent, {
      data: { tipo, campo: groupId }
    });

    modal
      .afterClosed()
      .subscribe(result => {
        console.log('se cerro el dialogo ')
      });

  }




/**
 * ^1 => Inyeccion de datos usuarios
 * ^2 => arreglo que define las columnas de la tabla en la vista
 */

}









