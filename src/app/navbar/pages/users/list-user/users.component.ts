import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pageable,  adminTypePopUp } from 'src/app/core/main.type';
import { ManageUsersComponent } from '../manage-users/manage-users.component';
import { userHttpService } from '../service/http/user-service.service';
import { Observable, Subject, map, merge, startWith, switchMap, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../core/models/main.model';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit{

  private _clearSubscritions$ = new Subject<void>();
  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  public user: User[] = [];//^1
  public displayedColumns = ['userId', 'name', 'direccion', 'email', 'edit'];//^2
  totalResultados: number = 0;

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _userHttpService: userHttpService,
    private paginator2: MatPaginatorIntl
  ) {
    this.paginator2.itemsPerPageLabel = 'Registros por página';
    this.paginator2.nextPageLabel = 'Siguiente';
    this.paginator2.previousPageLabel = 'Anterior';
  }
  ngOnInit(): void {
    // this.getUsers()
  }

  ngAfterViewInit(): void {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this._userHttpService.getAllUsers(
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        }),
        map((response:Pageable<User>) => {
          this.totalResultados = response.totalElements;
          // this.totalPages = response.data.totalPages;
          return response.content;
        }),
        takeUntil(this._clearSubscritions$)

      )
      .subscribe((data) => {
        this.user = data;
        console.log(data);
      });
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
  eliminarUser() {
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
}

/**
 * ^1 => Inyeccion de datos usuarios
 * ^2 => arreglo que define las columnas de la tabla en la vista
 */
