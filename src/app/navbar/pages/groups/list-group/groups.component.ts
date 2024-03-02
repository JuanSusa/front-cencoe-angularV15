import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Team, adminTypePopUp } from 'src/app/core/main.type';
import { GroupServiceService } from '../services/http/group-service.service';
import { GroupManagerComponent } from '../manage-group/group-manager.component';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent {
  public team: Team[] = [];//^1
  public displayedColumns = ['teamId', 'teamName', 'actions'];//^2
  isLoading = true;
  success: boolean = false;
  constructor(
    private readonly _dialog: MatDialog,
    private readonly _groupHttpService: GroupServiceService,
    private http: HttpClient
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

  eliminarTeam(){
    Swal.fire({
      title: "¿Esta seguro de eliminar este registro?",
      text: "Esta operacion es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff0844",
      cancelButtonColor: "rgb(2,0,36)",
      confirmButtonText: "Si, confirmar!",
      cancelButtonText: "No, cancelar!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminado",
          text: "El grupo ha sido eliminado",
          confirmButtonColor: "#ff0844",
          icon: "success"
        });
      }
    })

}
  manageGroup(tipo: adminTypePopUp, id?: number) {
    const modal = this._dialog.open(GroupManagerComponent, {
      data: { tipo, campo: id },
      width:'500px'
    });
    modal
      .afterClosed()
      .subscribe(result => {
        console.log('se cerro el dialogo ')
      });
  }
}
