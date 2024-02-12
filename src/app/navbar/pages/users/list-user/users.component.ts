import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User, adminTypePopUp } from 'src/app/core/main.type';
import { ManageUsersComponent } from '../manage-users/manage-users.component';
import { userHttpService } from '../service/http/user-service.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private clearSubscritions$ = new Subject<void>();
  public user: User[] = [];//^1
  public displayedColumns = ['userId', 'name', 'direccion', 'email', 'edit'];//^2
  isLoading = true;
  success: boolean = false;

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _userHttpService: userHttpService
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
}

/**
 * ^1 => Inyeccion de datos usuarios
 * ^2 => arreglo que define las columnas de la tabla en la vista
 */