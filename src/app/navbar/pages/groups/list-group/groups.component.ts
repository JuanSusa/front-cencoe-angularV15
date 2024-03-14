import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pageable,  Team,  adminTypePopUp } from 'src/app/core/main.type';
import { GroupServiceService } from '../services/http/group-service.service';
import { GroupManagerComponent } from '../manage-group/group-manager.component';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map, merge, startWith, switchMap, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent {

  private _clearSubscritions$ = new Subject<void>();
  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  public team: Team [] = [];
  public displayedColumns = ['teamId', 'teamName', 'actions'];
  totalResultados: number = 0;

  isLoading = true;
  success: boolean = false;
  mostrarSpinner: boolean = false;
  constructor(
    private readonly _dialog: MatDialog,
    private readonly _groupHttpService: GroupServiceService,
    private paginator2: MatPaginatorIntl,
    private http: HttpClient,
    private router: Router
  ) {
    this.paginator2.itemsPerPageLabel = 'Registros por página';
    this.paginator2.nextPageLabel = 'Siguiente';
    this.paginator2.previousPageLabel = 'Anterior';
  }
  ngOnInit(): void {
    // this.getAllGroups()
  }

  // ngAfterViewInit(): void {
  //   merge(this.paginator.page)
  //     .pipe(
  //       startWith({}),
  //       switchMap(() => {
  //         return this._groupHttpService.getAllTeams(
  //           this.paginator.pageIndex,
  //           this.paginator.pageSize
  //         );
  //       }),
  //       map((response: Pageable<Team>) => {
  //         this.totalResultados = response.totalElements;
  //         // this.totalPages = response.data.totalPages;
  //         return response.content;
  //       }),
  //       takeUntil(this._clearSubscritions$)

  //     )
  //     .subscribe((data) => {
  //       this.team = data;
  //       console.log(data);
  //     });
  // }

  manageGroup(tipo: adminTypePopUp, id?: number) {
    const modal = this._dialog.open(GroupManagerComponent, {
      data: { tipo, campo: id },
      width: '500px'
    });
    modal
      .afterClosed()
      .subscribe(result => {
        console.log('se cerro el dialogo ')
      });
  }

  eliminarTeam() {
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

  toggleSpinner() {//mostrar Spinner
    this.mostrarSpinner = !this.mostrarSpinner;
  }
}
