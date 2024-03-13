import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User, adminTypePopUp } from 'src/app/core/main.type';
import { ManageUsersComponent } from '../manage-users/manage-users.component';
import { userHttpService } from '../service/http/user-service.service';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  mostrarSpinner: boolean = true; // Mostrar Spinner
  private clearSubscritions$ = new Subject<void>();
  public user: User[] = [];//^1
  public displayedColumns = ['userId', 'name', 'direccion', 'email', 'edit'];//^2
  isLoading = true;
  success: boolean = false;

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _userHttpService: userHttpService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.getAllUsers()
  }
  getAllUsers() {
    this._userHttpService.getAllUsers()
      .pipe(
        takeUntil(this.clearSubscritions$)
      )
      .subscribe(data => {
        this.user = data;
        console.log(data)
      })
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
  eliminarUser(){
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
          text: "Usuario eliminado",
          confirmButtonColor: "#ff0844",
          icon: "success"
        });
      }
    })
}
toggleSpinner() {//mostrar Spinner
  this.mostrarSpinner = !this.mostrarSpinner;

}
}

/**
 * ^1 => Inyeccion de datos usuarios
 * ^2 => arreglo que define las columnas de la tabla en la vista
 */
