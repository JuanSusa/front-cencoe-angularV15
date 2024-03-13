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

/**
 * Representa el componente responsable de gestionar usuarios.
 */
export class ManageUsersComponent implements OnInit {

  public readonly userForm: UntypedFormGroup;
  public typeDocs: TypeDocs[] = [];
  public typeDoc: TypeDocs | undefined;
  public user: User[] = [];

  /**
    * Representa la clase ManageUsersComponent.
    * Este componente es responsable de gestionar los datos de usuario.
    * @constructor
    * @param {_TipodocumentoHttpService} _TipodocumentoHttpService - El servicio HTTP para los tipos de documento.
    * @param {_userServiceHttp} _userServiceHttp - El servicio HTTP para los usuarios.
    * @param {_matDialogRef} _matDialogRef - La referencia al diálogo de administración de usuarios.
    * @param {adminPopUp<number>} data - Los datos del diálogo de administración de usuarios.
    * @param {FormBuilder} formBuilder - El constructor de formularios.
    */
  constructor(
    private _TipodocumentoHttpService: TipodocumentoHttpService,
    private _userServiceHttp: userHttpService,
    private _matDialogRef: MatDialogRef<ManageUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: adminPopUp<number>,
    private formBuilder: FormBuilder,
  ) {
    this.userForm = formBuilder.group({
      userId: [{ value: '', disabled: true }],
      userNumDoc: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11), Validators.pattern(/^\d+$/)]],
      userName: ['', Validators.required],
      userLastName: ['', Validators.required],
      userAddress: ['', [Validators.required, Validators.minLength(3)]],
      userPhone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^\d+$/)]],
      userPassword: ['', [Validators.required, Validators.minLength(10), this.passwordValidator]],
      userEmail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      userState: [''],
      userDocType: ['', Validators.required]
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

    const { tipo, campo } = this.data;
    this.titulo =
      this.data.tipo === 'crear' ? 'Crear nuevo usuario' : 'Actualizar Usuario';
    this.subtitulo =
      this.data.tipo === 'crear' ? 'Ingrese los datos para crear un nuevo usuario' : 'Ingrese los nuevos datos del usuario';

    if (tipo == 'editar') {
      this._userServiceHttp.getUserById(campo!).subscribe((user) => {
        this.userForm.get('userId')?.patchValue(user.userId);
        this.userForm.get('userNumDoc')?.patchValue(user.userNumDoc);
        this.userForm.get('userName')?.patchValue(user.userName);
        this.userForm.get('userLastName')?.patchValue(user.userLastName);
        this.userForm.get('userAddress')?.patchValue(user.userAddress);
        this.userForm.get('userPhone')?.patchValue(user.userPhone);
        this.userForm.get('userEmail')?.patchValue(user.userEmail);
        this.userForm.get('userPassword')?.patchValue(user.userPassword);
        this.userForm.get('userState')?.patchValue(user.userState);
        this.userForm.get('userDocType')?.patchValue(user.userDocType?.docTypeId);
      });
    }

    this.getAllTypeDocs()

  }

  /**
    * Recupera todos los tipos de documentos del servidor.
    * @returns Un Observable que emite un array de TypeDocs.
    */
  getAllTypeDocs() {
    this._TipodocumentoHttpService.getAllTypeDocuments()
      .subscribe((data: TypeDocs[]) => {
        this.typeDocs = data;
        console.log(data);
      })
  }

  /**
    * Encuentra el tipo de documento basado en el valor seleccionado en userForm.
    */
  findTypeDoc() {
    const typeDoc = this.userForm.get('userDocType')?.value;
    if (typeDoc) {

      this._TipodocumentoHttpService.getTypeDocsById(typeDoc).subscribe((data) => {
        this.typeDoc = data;
        console.log(data);
      })
    }
  }

  /**
    * Crea un nuevo usuario.
    *
    * Este método valida el formulario de usuario y crea un nuevo usuario basado en los datos del formulario.
    * Si el formulario no es válido, muestra un mensaje de advertencia.
    *
    * @returns void
    */
  public createUser(): void {
    // this.findTypeDoc();
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
    this.userForm.value.userDocType = this.typeDoc;



    this._userServiceHttp[metodoEjecutar](user).subscribe({
      next: (mensaje) => this.mostrarMensajeEjecucion(tipo, mensaje),
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      }
    });

    return console.log('Formulario valido', value);

  }

  /**
   * Muestra un mensaje de ejecución para indicar el resultado de una transacción.
   *
   * @param tipo - El tipo de transacción ('crear' o 'actualizar').
   * @param message - El mensaje a mostrar en el diálogo.
   */
  private mostrarMensajeEjecucion(tipo: any, message: any) {
    const tipoMensaje = tipo == 'crear' ? 'creada' : 'actualizada';
    Swal.fire(
      'Transaccion exitosa',
      `La empresa ha sido ${tipoMensaje} con exito`,
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
  private getUserById(esTipoCrear: boolean) {
    let user = this.userForm.value;

    if (!esTipoCrear) {
      const userId = this.userForm.get('userId')!.value;
      user = { ...user, userId };
    }
    console.log(user)
    return user;
  }

  public closeDialog() {
    this._matDialogRef.close();
  }


  /**
    * Maneja el evento de entrada numérica.
    * Filtra los caracteres no numéricos del valor de entrada.
    *
    * @param event - El objeto de evento de entrada.
    */
  onNumericInput(event: any): void {
    const input = event.target.value;
    event.target.value = input.replace(/[^0-9]/g, '');
  }


  /**
    * Devuelve una función validadora que verifica si la contraseña cumple con los criterios especificados.
    * La contraseña debe contener al menos una letra minúscula, una letra mayúscula y un dígito.
    *
    * @returns Una función validadora que devuelve un objeto `ValidationErrors` si la contraseña no cumple con los criterios, de lo contrario `null`.
    */
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;
      const passwordCriteria = /[a-zA-Z]+.*[0-9]+.*[A-Z]+/.test(value);

      if (!passwordCriteria) {

        return { passwordCriteria: true };
      }
      return null;
    };

  }
  // solo deja incluir letras
  onNameInput(event: any): void {
    const input = event.target.value;
    event.target.value = input.replace(/[^A-Za-z ]/g, '');
  }

}
