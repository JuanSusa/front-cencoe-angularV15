import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Provider, ReqResponse, TypeDocs, adminPopUp, adminTypePopUp } from 'src/app/core/main.type';
import { ProviderServiceService } from '../services/provider-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TipodocumentoHttpService } from '../../tipodocumento/services/tipo-documento.service';
import { FloatLabelType } from '@angular/material/form-field';



@Component({
  selector: 'app-manage-providers',
  templateUrl: './manage-providers.component.html',
  styleUrls: ['./manage-providers.component.scss']
})
export class ManageProvidersComponent implements OnInit {
  // provider: Provider = {} as Provider
  titulo: String = ''
  subtitulo: String = ''
  typeDocs: TypeDocs[] = []

  constructor(private readonly _matDialogRef: MatDialogRef<ManageProvidersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: adminPopUp<number>,
    private formBuilder: FormBuilder,
    private ServiceProvider: ProviderServiceService,
    private _ServiceTD : TipodocumentoHttpService

  ) {

  }
   providerForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(35)]],
    adress: ['', Validators.required],
    contact: ['', [Validators.required, Validators.maxLength(10), Validators.pattern("[0-9]{10}")]],
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    details: ['', Validators.required],
    numDocumento: ['',[ Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern(/^\d+$/)]],
    TipoDocumento: [''],
  })
  ngOnInit(): void {
    this._ServiceTD.getAllTypeDocuments().subscribe((data) =>{
      this.typeDocs = data
      console.log(data)
  })
    const { tipo, campo } = this.data
    this.titulo =
      this.data.tipo === 'crear' ? 'Crear nuevo Proveedor':'Actualizar proveedor'

    this.subtitulo =
      this.data.tipo === 'crear' ? 'Ingrese los datos para crear un nuevo proveedor':'Ingrese los nuevos datos del proveedor'
    debugger
  }
  // onSubmit():void{
  //     if(this.providerForm.valid){
  //       const provider : Provider = {
  //             //   providerId: null,
  //       providerName : this.providerForm.value.providerName,
  //       providerAddress: this.providerForm.value.providerAddress,
  //       providerEmail:this.providerForm.value.providerEmail,
  //       providerContact: this.providerForm.value.providerContact,
  //       providerDetails: this.providerForm.value.providerDetails,
  //       providerDoctype: this.providerForm.value.providerDoctype

  //       }
  //       this.ServiceProvider.saveProvider(provider).subscribe(
  //         (response) =>{
  //           console.log(response)
  //         }
  //       )
  //     }
  //   } 

  onNumericInput(event: any): void {
    // Filtrar caracteres no numéricos
    const input = event.target.value;
    event.target.value = input.replace(/[^0-9]/g, '');
  }
  public cerrarDialog(){
    this._matDialogRef.close()
  }
}