import { Component, Inject, OnInit, inject } from '@angular/core';
import { Provider, User, adminPopUp } from 'src/app/core/main.type';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validator, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.scss'],
})

export class ManageCustomersComponent {
  public user:User[]=[]

  constructor(
    private readonly _matDialogRef: MatDialogRef<ManageCustomersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: adminPopUp<number>, //^3
    private formBuiler: FormBuilder,

  ) { }
  // Variable que guarda o cambia según el click en el botón
  mostrar: boolean = false;
  // Variables de titulo y subtitulo en la página
  titulo: string = '';
  subtitulo: string = '';
  // Método para mostrar la pestaña ver o editar
  mostrarVentana() {
    this.mostrar  = true;
  }
  ngOnInit(): void {
    //^5
    const { tipo, campo } = this.data;
    this.titulo =
      this.data.tipo === 'crear' ? ' Crear nuevo cliente' : this.data.tipo === 'ver' ? 'Detalles del cliente' : 'Editar cliente';
    this.subtitulo = this.data.tipo === 'crear' ? 'Ingrese los datos para crear un nuevo cliente' : this.data.tipo === 'ver' ? 'Detalles del cliente' : 'Ingrese los nuevos datos del cliente';
  }
  //^4
  customerForm = this.formBuiler.group({
    customerDocument: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11), Validators.pattern(/^\d+$/)]],
    customerName: ['', Validators.required],
    customerLastName: ['', Validators.required],
    customerAdress: ['', Validators.required, Validators.minLength(3)],
    customerPhone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^\d+$/)]],
    customerState: [''],
    customerTipoDocumento: [''],
    user: ['']
  })
  public executionMessage() {
    this._matDialogRef.close();
  }
  //^6
  onNumericInput(event: any): void {//^6.1
    // Filtrar caracteres no númericos
    const input = event.target.value; //^6.2
    event.target.value = input.replace(/[^0.9]/g, ''); //^6.3
  }
  //^7
  passwordValidator(): ValidatorFn {//^7.1
    return (control: AbstractControl): ValidationErrors | null => {//^7.2
      const value: string = control.value; //^7.3
      const passwordCriteria = /[a-zA-Z]+.*[0-9]+.*[A-Z]+/.test(value); //^7.4
      if (!passwordCriteria) {//^7.5
        return { passwordCriteria: true };
      }
      return null;
    };
  }

}
