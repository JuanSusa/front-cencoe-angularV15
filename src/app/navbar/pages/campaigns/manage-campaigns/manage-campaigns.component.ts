import { Component, Inject } from '@angular/core';
import { adminPopUp } from 'src/app/core/main.type';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-campaigns',
  templateUrl: './manage-campaigns.component.html',
  styleUrls: ['./manage-campaigns.component.scss']
})
export class ManageCampaignsComponent {
  maxDate: Date;
  constructor(
    private readonly _matDialogRef: MatDialogRef<ManageCampaignsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: adminPopUp<number>,//^3
    private formBuilder: FormBuilder
  ) { this.maxDate = new Date();}

  titulo: string = '';
  subtitulo: string = '';
  ngOnInit(): void {
    //^5
    const { tipo, campo } = this.data;
    this.titulo =
      this.data.tipo === 'crear' ? 'Crear nueva Campaña' : this.data.tipo === 'ver' ? 'Detalles de la Campaña' : 'Editar Campaña';
    this.subtitulo =
      this.data.tipo === 'crear' ? 'Ingrese los datos para crear un nueva nueva Campaña' : this.data.tipo === 'ver' ? 'Detalles del Campaña' : 'Ingrese los nuevos datos de la Campaña';
    debugger


  }

  //^4

  campaignForm = this.formBuilder.group({
    id : ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    nombre : ['', [Validators.required, Validators.maxLength(20)]],
    capacidad : ['', [Validators.required, Validators.maxLength(20)]],
    fechaInicio : ['', [Validators.required, Validators.maxLength(20)]],
    fechaFinal : ['', [Validators.required, Validators.maxLength(20)]],
    observaciones: ['', [Validators.required, Validators.maxLength(100)]],
    estado : ['', [Validators.required, Validators.maxLength(20)]],
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


}

