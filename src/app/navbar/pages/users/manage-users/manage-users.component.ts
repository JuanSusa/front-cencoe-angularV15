import { TipodocumentoHttpService } from './../../tipodocumento/services/tipo-documento.service';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { adminPopUp } from 'src/app/core/main.type';
import { TipodocumentoComponent } from '../../tipodocumento/manage-tipodocumento/tipodocumento.component';
import { userHttpService } from '../service/http/user-service.service';
import { TypeDocs } from '../../tipodocumento/core/models/main.model';
import Swal from 'sweetalert2';
import { User } from '../core/models/main.model';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  public readonly userForm: UntypedFormGroup;
  public typeDocs: TypeDocs[] = [];
  public typeDoc: TypeDocs|undefined;
  public user: User[] = [];

  constructor(
    private _TipodocumentoHttpService: TipodocumentoHttpService,
    private _userServiceHttp: userHttpService,
    private _matDialogRef: MatDialogRef<ManageUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: adminPopUp<number>,//^3
    private formBuilder: FormBuilder,
  ) {

    //^4
    this.userForm = formBuilder.group({
      userId: [{ value: '', disabled: true }],
      userDocument: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11), Validators.pattern(/^\d+$/)]],
      userName: ['', Validators.required],
      userLastName: ['', Validators.required],
      userAddress: ['', [Validators.required, Validators.minLength(3)]],
      userPhone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^\d+$/)]],
      userPassword: ['', [Validators.required, Validators.minLength(10), this.passwordValidator]],
      userEmail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      userState: [''],
      userTipoDocumento: ['', Validators.required]
    })
  }

  titulo: string = '';
  subtitulo: string = '';
  ngOnInit(): void {
    //^5
    const { tipo, campo } = this.data;
    this.titulo =
      this.data.tipo === 'crear' ? 'Crear nuevo usuario' : 'Actualizar Usuario';
    this.subtitulo =
      this.data.tipo === 'crear' ? 'Ingrese los datos para crear un nuevo usuario' : 'Ingrese los nuevos datos del usuario';

    if (tipo == 'editar') {
      this._userServiceHttp.getUserById(campo!).subscribe((user) => {
        this.userForm.get('userId')?.patchValue(user.userId);
        this.userForm.get('userDocument')?.patchValue(user.userNumDoc);
        this.userForm.get('userName')?.patchValue(user.userName);
        this.userForm.get('userLastName')?.patchValue(user.userLastName);
        this.userForm.get('userAddress')?.patchValue(user.userAddress);
        this.userForm.get('userPhone')?.patchValue(user.userPhone);
        this.userForm.get('userEmail')?.patchValue(user.userEmail);
        this.userForm.get('userPassword')?.patchValue(user.userPassword);
        this.userForm.get('userState')?.patchValue(user.userState);
        this.userForm.get('userTipoDocumento')?.patchValue(user.userDocType?.docTypeId);
      });
    }

    this.getAllTypeDocs()

  }

  getAllTypeDocs() {
    this._TipodocumentoHttpService.getAllTypeDocuments()
      .subscribe((data: TypeDocs[]) => {
        this.typeDocs = data;
        console.log(data);
      })
  }

  findTypeDoc(){
    const typeDoc = this.userForm.get('userTipoDocumento')?.value;
    if(typeDoc){

      this._TipodocumentoHttpService.getTypeDocsById(typeDoc).subscribe((data) => {
        this.typeDoc = data;
        console.log(data);
      })
    }
  }
  public createUser(): void {
    this.findTypeDoc();
    const { invalid, value } = this.userForm;
    if (invalid) {
      Swal.fire(
        'Porfavor espere',
        'Existen campos que no son validos',
        'warning'
      );
      return;
    }

    const { tipo, campo } = this.data;
    const esTipoCrear = tipo === 'crear';
    const metodoEjecutar: keyof userHttpService = esTipoCrear
      ? 'createUser'
      : 'updateUser';
    const user = this.getUserById(esTipoCrear);
    this._userServiceHttp[metodoEjecutar](user).subscribe((mensaje) =>
      this.mostrarMensajeEjecucion(tipo, mensaje)
    );
  }

  private mostrarMensajeEjecucion(tipo: any, message: any) {
    const tipoMensaje = tipo == 'crear' ? 'creada' : 'actualizada';
    Swal.fire(
      'Transaccion exitosa',
      `La empresa ha sido ${tipoMensaje} con exito`,
      'success'
    );
    this._matDialogRef.close(true);
  }

  private getUserById(esTipoCrear: boolean) {
    let user = this.userForm.value;

    if (!esTipoCrear) {
      const userId = this.userForm.get('userId')!.value;
      user = { ...user, userId };
    }
    return user;
  }

  // getUserById(userId: number): void {
  //   this._userServiceHttp.getUserById(userId).subscribe(
  //     (userData) => {
  //       this.user = userData;
  //       // this.userForm.patchValue(userData);
  //       console.log('datos en el componente', userData);
  //     },
  //     (error) => {
  //       console.error('Error al obtener datos del usuario', error);
  //     }
  //   )
  // }



  public closeDialog() {
    this._matDialogRef.close();
  }

  //^6
  onNumericInput(event: any): void {//^6.1
    // Filtrar caracteres no numéricos
    const input = event.target.value;//^6.2
    event.target.value = input.replace(/[^0-9]/g, '');//^6.3
  }

  //^7
  passwordValidator(): ValidatorFn {//^7.1
    return (control: AbstractControl): ValidationErrors | null => {//^7.2
      const value: string = control.value;//^7.3
      const passwordCriteria = /[a-zA-Z]+.*[0-9]+.*[A-Z]+/.test(value);//^7.4

      if (!passwordCriteria) { //^7.5

        return { passwordCriteria: true };
      }
      return null;
    };
  }

}
