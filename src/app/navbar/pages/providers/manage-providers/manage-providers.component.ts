import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { adminPopUp, adminTypePopUp } from 'src/app/core/main.type';



@Component({
  selector: 'app-manage-providers',
  templateUrl: './manage-providers.component.html',
  styleUrls: ['./manage-providers.component.scss']
})
export class ManageProvidersComponent implements OnInit{

  constructor (private readonly _matDialogRef: MatDialogRef<ManageProvidersComponent>,
  @Inject (MAT_DIALOG_DATA) public data: adminPopUp<number>,
  private formBuilder: FormBuilder
  ){}

  titulo: String = ''
  subtitulo: String = ''


  ngOnInit(): void {
    const {tipo, campo} = this.data
    this.titulo =
      this.data.tipo === 'crear' ? 'Crear nuevo Proveedor': this.data.tipo === 'ver' ? 'Detalles proveedor' :'Actualizar proveedor'

    this.subtitulo=
      this.data.tipo === 'crear' ? 'ingrese los datos del proveedor': this.data.tipo === 'ver' ? 'detalles del proveedor' : 'Ingrese los nuevos datos del proveedor'
      debugger
  }

  createProvider = new FormGroup({
    name: new FormControl(''),
    adress: new FormControl(''),
    contact: new FormControl(''),
    email: new FormControl(''),
    details: new FormControl(''),


    

  })
}
