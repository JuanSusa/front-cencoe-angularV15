import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { adminPopUp } from 'src/app/core/main.type';

@Component({
  selector: 'app-manage-campaigns',
  templateUrl: './manage-campaigns.component.html',
  styleUrls: ['./manage-campaigns.component.scss']
})
export class ManageCampaignsComponent implements OnInit {

  constructor(
    private readonly _matDialogRef: MatDialogRef<ManageCampaignsComponent>,
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
  campaignsForm = this.formBuilder.group({
    id : [ '',[Validators.required, Validators.pattern("^[0-9]*$")]],
    nombre : ['' , [Validators.required , Validators.maxLength(20)]],
    capacidad : ['' , [Validators.required, Validators.maxLength(20)]],
    fechaInicio : ['null' , [Validators.required , Validators.maxLength(20)]],
    fechaFinal : ['null' ,[ Validators.required, Validators.maxLength(20)]],
    observaciones: ['' ,[Validators.required, Validators.maxLength(100)]],
    estado : ['null' , [Validators.required, Validators.maxLength(20)]]
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

