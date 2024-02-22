import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Team, adminTypePopUp } from 'src/app/core/main.type';
import { GroupServiceService } from '../services/http/group-service.service';
import { GroupManagerComponent } from '../manage-group/group-manager.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent {
  public team: Team[] = [];//^1
  public displayedColumns = ['teamId', 'teamName'];//^2
  isLoading = true;
  success: boolean = false;

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _groupHttpService: GroupServiceService
  ){

  }
  ngOnInit(): void {
    this.getAllGroups()
  }
  getAllGroups() {
    this._groupHttpService.getAllGroups().subscribe(data => {
      this.team = data;
      console.log(data)
    })
  }
  manageGroup(tipo: adminTypePopUp, id?: number) {
    const modal = this._dialog.open(GroupManagerComponent, {
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
