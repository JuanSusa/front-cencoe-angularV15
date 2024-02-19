import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Provider, TypeDocs, adminPopUp, adminTypePopUp } from 'src/app/core/main.type';
import { ProviderServiceService } from '../services/provider-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TipodocumentoHttpService } from '../../tipodocumento/services/tipo-documento.service';



@Component({
  selector: 'app-manage-providers',
  templateUrl: './manage-providers.component.html',
  styleUrls: ['./manage-providers.component.scss']
})
export class ManageProvidersComponent implements OnInit {
  // provider: Provider = {} as Provider
  titulo: String = ''
  subtitulo: String = ''
  providerForm: FormGroup
  typeDocs: TypeDocs[] = []

  constructor(private readonly _matDialogRef: MatDialogRef<ManageProvidersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: adminPopUp<number>,
    private formBuilder: FormBuilder,
    private ServiceProvider: ProviderServiceService,
    private _ServiceTD : TipodocumentoHttpService

  ) {
    this.providerForm = formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(35)]],
      adress: ['', Validators.required],
      contact: ['', [Validators.required, Validators.maxLength(10), Validators.pattern("[0-9]{10}")]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      details: ['', Validators.required],
      providerTipoDocumento: [''],
    })

  }
  ngOnInit(): void {
    this._ServiceTD.getAllTypeDocuments().subscribe((data) =>{
      this.typeDocs = data
      console.log(data)
  })
    const { tipo, campo } = this.data
    this.titulo =
      this.data.tipo === 'crear' ? 'Crear nuevo Proveedor' : this.data.tipo === 'ver' ? 'Detalles proveedor' : 'Actualizar proveedor'

    this.subtitulo =
      this.data.tipo === 'crear' ? 'Ingrese los datos del proveedor' : this.data.tipo === 'ver' ? 'detalles del proveedor' : 'Ingrese los nuevos datos del proveedor'
    debugger
  }

  onSubmit(): void {
    const providerData = this.providerForm.value;
    this.ServiceProvider.saveProvider(this.providerForm.value).subscribe(
      (provider: Provider) => {
        console.log('Proveedor guardado exitosamente:', provider);
        this.providerForm.reset();
        
      },
      error => {
        console.error('Error al guardar proveedor:', error);
      }
    );
    //  this.ServiceProvider.addProvider(this.providerForm.value).subscribe((data: Provider) =>{
    //   console.log(data)
    //   this.providerForm.reset()

    //  },
    //  error => {
    //   console.error("Error al guardar proveedor", error)
    //  }
    //  )
  }



}