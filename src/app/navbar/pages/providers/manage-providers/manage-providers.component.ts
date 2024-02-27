import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Provider, TypeDocs, adminPopUp} from 'src/app/core/main.type';
import { TipodocumentoHttpService } from '../../tipodocumento/services/tipo-documento.service';
import { ProviderService } from '../services/provider-service.service';
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
    @Inject(ProviderService) private readonly providerService: ProviderService,
    private _ServiceTD : TipodocumentoHttpService
  ) {
    this.providerForm = formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(35)]],
      adress: ['', Validators.required],
      contact: ['', [Validators.required, Validators.maxLength(10), Validators.pattern("[0-9]{10}")]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      details: ['', Validators.required],
      TipoDocumento: [''],
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
  onSubmit():void{
      if(this.providerForm.valid){
        const provider : Provider = {
              //   providerId: null,
        providerName : this.providerForm.value.providerName,
        providerAddress: this.providerForm.value.providerAddress,
        providerEmail:this.providerForm.value.providerEmail,
        providerContact: this.providerForm.value.providerContact,
        providerDetails: this.providerForm.value.providerDetails,
        providerDoctype: this.providerForm.value.providerDoctype

        }
        this.providerService.saveProvider(provider).subscribe(
          (response) =>{
            console.log(response)
          }
        )
      }
  }
  public cerrarDialog(){
    this._matDialogRef.close()
  }
}
