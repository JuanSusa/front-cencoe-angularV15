import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { adminPopUp } from 'src/app/core/main.type';
import { TipodocumentoHttpService } from '../../tipodocumento/services/tipo-documento.service';
import { ProviderService } from '../services/provider-service.service';
import { FloatLabelType } from '@angular/material/form-field';
import { TypeDocs } from '../../tipodocumento/core/models/main.model';
import Swal from 'sweetalert2';
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
    @Inject(ProviderService) private readonly providerService: ProviderService,
    private _ServiceTD: TipodocumentoHttpService
  ) {



  }
  providerForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(35)]],
    adress: ['', Validators.required],
    contact: ['', [Validators.required, Validators.maxLength(10), Validators.pattern("[0-9]{10}")]],
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    details: ['', [Validators.required, Validators.maxLength(151)]],
    numDocumento: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern(/^\d+$/)]],
    tipoDocumento: ['', Validators.required],
  })
  ngOnInit(): void {
    // this.getTypeDocs()
    const { tipo, campo } = this.data
    this.titulo =
      this.data.tipo === 'crear' ? 'Crear nuevo Proveedor' : 'Actualizar proveedor'

    this.subtitulo =
      this.data.tipo === 'crear' ? 'Ingrese los datos para crear un nuevo proveedor' : 'Ingrese los nuevos datos del proveedor'
  }

  // getTypeDocs() {
  //   this._ServiceTD.getAllTypeDocuments().subscribe((data) => {
  //     this.typeDocs = data.content;
  //     console.log(data)
  //   })
  // }




  onSubmit(): void {
    if (this.providerForm.invalid){
      Swal.fire(
        'Por favor espere',
        'Existen campos que no son validos',
        'warning'
      );
      return;
    }

  }

  onNumericInput(event: any): void {
    // Filtrar caracteres no numéricos
    const input = event.target.value;
    event.target.value = input.replace(/[^0-9]/g, '');
  }
  public cerrarDialog() {
    this._matDialogRef.close()
  }

}
