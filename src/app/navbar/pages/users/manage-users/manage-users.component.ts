import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { adminPopUp } from 'src/app/core/main.type';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  constructor(
    private readonly _matDialogRef: MatDialogRef<ManageUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: adminPopUp<number>,//^3
    private formBuilder: FormBuilder 
  ) { }

  titulo: string = '';
  subtitulo: string = '';
  ngOnInit(): void {
    //^5
    const { tipo, campo } = this.data;
    this.titulo =
      this.data.tipo === 'crear' ? 'Crear nuevo usuario' : this.data.tipo === 'ver' ? 'Detalles del Usuario' : 'Editar Usuario';
    this.subtitulo =
      this.data.tipo === 'crear' ? 'Ingrese los datos para crear un nuevo usuario' : this.data.tipo === 'ver' ? 'Detalles del Usuario' : 'Ingrese los nuevos datos del usuario';
    debugger
    
    
  }

  //^4
  userForm = this.formBuilder.group({
    userDocument: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11), Validators.pattern(/^\d+$/)]],
    userName: ['', Validators.required],
    userLastName: ['', Validators.required],
    userAddress: ['', [Validators.required, Validators.minLength(3)]],
    userPhone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^\d+$/)]],
    userPassword: ['', [Validators.required, Validators.minLength(10), this.passwordValidator]],
    userState: [''],
    userTipoDocumento: ['']
  })
  
  public executionMesssage() {
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
