import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { adminPopUp } from 'src/app/core/main.type';
import { MatDialog } from '@angular/material/dialog';
import { userHttpService } from '../../users/service/http/user-service.service';
import { GroupServiceService } from '../services/http/group-service.service';
import { User } from '../../users/core/models/main.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-group-manager',
  templateUrl: './group-manager.component.html',
  styleUrls: ['./group-manager.component.scss']
})
export class GroupManagerComponent implements OnInit {
  // public team:Team[]=[]
  public users: User[] = [];
  public user: User | undefined;
  public showBtn: boolean = false;
  maxDate: Date;

  public readonly groupForm: UntypedFormGroup;

  constructor(
    public dialog: MatDialog,
    private _userServiceHttp: userHttpService,
    private _teamServiceHttp: GroupServiceService,
    private readonly _matDialogRef: MatDialogRef<GroupManagerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: adminPopUp<number>,//^3
    private formBuilder: FormBuilder,
    // private _UsersService : userHttpService,
  ) {
    this.maxDate = new Date();
    this.groupForm = formBuilder.group({
      groupName: ['', Validators.required],
      groupLastName: ['', Validators.required],
      // fechaInicio : ['', Validators.required],
      // fechaFinal : ['', Validators.required],
      groupState: [''],
      integrantes: ['', Validators.required]
    })
  }
  titulo: string = '';
  subtitulo: string = '';
  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * @remarks
   * Este método se utiliza para realizar tareas de inicialización al cargar el componente.
   * 
   * @returns No devuelve ningún valor.
   */
  ngOnInit(): void {
    //^5
    const { tipo, campo } = this.data;
    this.titulo =
      this.data.tipo === 'crear' ? 'Crear nuevo grupo' : 'Actualizar Grupo';
    this.subtitulo =
      this.data.tipo === 'crear' ? 'Ingrese los datos para crear un nuevo grupo' : 'Ingrese los nuevos datos del grupo';
    if (tipo == 'editar') {
      this._teamServiceHttp.getTeamById(campo!).subscribe((team) => {
        this.groupForm.get('teamId')?.patchValue(team.teamId);
        this.groupForm.get('teamName')?.patchValue(team.teamName);
        this.groupForm.get('teamCapacity')?.patchValue(team.teamCapacity);
        this.groupForm.get('teamState')?.patchValue(team.teamState);
      });
    }

    // this.getAllUsers()

  }

  public showButton() {
    this.showBtn = !this.showBtn
  }

  // getAllUsers(){
  //   this._userServiceHttp.getAllUsers()
  //   .subscribe((data: User[]) => {
  //     this.users = data;
  //     console.log(data);
  //   })
  // }

  // findUsers() {
  //   const user = this.groupForm.get('groupUser')?.value;
  //   if (user) {
  //     this._userServiceHttp.getUserById(user).subscribe((data => {
  //       this.user = data;
  //       console.log(data);
  //     }))
  //   }
  // }

    /**
   * Muestra un mensaje de ejecución para indicar el resultado de una transacción.
   * 
   * @param tipo - El tipo de transacción ('crear' o 'actualizar').
   * @param message - El mensaje a mostrar en el diálogo.
   */
    private mostrarMensajeEjecucion(tipo: any, message: any) {
      const tipoMensaje = tipo == 'crear' ? 'Creada' : 'Actualizada';
      Swal.fire(
        'Operación exitosa',
        `El grupo ha sido ${tipoMensaje} con exito`,
        'success'
      );
      this._matDialogRef.close(true);
    }
  
    /**
     * Obtiene los datos del usuario a partir del formulario.
     * 
     * @param esTipoCrear Indica si se trata de un tipo de creación de usuario.
     * @returns Los datos del usuario obtenidos del formulario.
     */
    private getTeamById(esTipoCrear: boolean) {
      let team = this.groupForm.value;
  
      if (!esTipoCrear) {
        const teamId = this.groupForm.get('teamId')!.value;
        team = { ...team, teamId };
      }
      return team;
    }
  
    public closeDialog() {
      this._matDialogRef.close();
    }

  public executionMesssage() {
    this._matDialogRef.close();
  }
  //^6
  onNumericInput(event: any): void {//^6.1
    // Filtrar caracteres no numéricos
    const input = event.target.value;//^6.2
    event.target.value = input.replace(/[^0-9]/g, '');//^6.3
  }
}
