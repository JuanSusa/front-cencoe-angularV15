import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { adminPopUp, adminTypePopUp } from 'src/app/core/main.type';



@Component({
  selector: 'app-manage-providers',
  templateUrl: './manage-providers.component.html',
  styleUrls: ['./manage-providers.component.scss']
})
export class ManageProvidersComponent implements OnInit {

  public ProviderForm : FormGroup 
 

  constructor (private readonly _matDialogRef: MatDialogRef<ManageProvidersComponent>,
  @Inject (MAT_DIALOG_DATA) public data: adminPopUp<number>,
  private formBuilder: FormBuilder  //el form builder nos va a construir nuestro formulario
  ){
    this.ProviderForm = formBuilder.group({
      name:['', [Validators.required, Validators.maxLength(35)]],
      adress: ['', Validators.required],
      contact:['',[ Validators.required, Validators.maxLength(10), Validators.pattern("[0-9]{10}")]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      details:['', Validators.required],
      providerTipoDocumento:[''],
      status: ['']
    })

  }
  


  titulo: String = ''
  subtitulo: String = ''


  ngOnInit(): void {
    const {tipo, campo} = this.data
    this.titulo =
      this.data.tipo === 'crear' ? 'Crear nuevo Proveedor': this.data.tipo === 'ver' ? 'Detalles proveedor' :'Actualizar proveedor'

    this.subtitulo=
      this.data.tipo === 'crear' ? 'Ingrese los datos del proveedor': this.data.tipo === 'ver' ? 'detalles del proveedor' : 'Ingrese los nuevos datos del proveedor'
      debugger
  }



}

