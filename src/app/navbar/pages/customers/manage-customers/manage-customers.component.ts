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
    //^4
    customerForm = this.formBuiler.group({
      customerDocument: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11), Validators.pattern(/^\d+$/)]],
      customerName: ['', Validators.required],
      customerLastName: ['', Validators.required],
      customerAdress: ['', Validators.required, Validators.minLength(3)],
      customerPhone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^\d+$/)]],
      customerState: [''],
      customerTipoDocumento: ['', Validators.required],
    })

  // Variables de titulo y subtitulo en la página
  titulo: string = '';
  subtitulo: string = '';
  ngOnInit(): void {
    //^5
    const { tipo, campo } = this.data;
    this.titulo =
      this.data.tipo === 'crear' ? ' Crear nuevo cliente' : 'Actualizar cliente';
    this.subtitulo = this.data.tipo === 'crear' ? 'Ingrese los datos para crear un nuevo cliente' : 'Ingrese los nuevos datos del cliente';
  }
  public executionMessage() {
    this._matDialogRef.close();
  }
  //^6
  onNumericInput(event: any): void {//^6.1
    // Filtrar caracteres no numéricos
    const input = event.target.value;//^6.2
    event.target.value = input.replace(/[^0-9]/g, '');//^6.3
  }

}
