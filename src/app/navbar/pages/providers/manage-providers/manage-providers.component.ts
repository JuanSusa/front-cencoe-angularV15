import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { adminPopUp } from 'src/app/core/main.type';
import { TipodocumentoHttpService } from '../../tipodocumento/services/tipo-documento.service';
import { ProviderService } from '../../providers/services/provider-service.service';
import { FloatLabelType } from '@angular/material/form-field';
import { TypeDocs } from '../../tipodocumento/core/models/main.model';
import Swal from 'sweetalert2';
import { Provider } from '../core/models/main.model';

@Component({
  selector: 'app-manage-providers',
  templateUrl: './manage-providers.component.html',
  styleUrls: ['./manage-providers.component.scss']
})

export class ManageProvidersComponent implements OnInit {
  public typeDocs: TypeDocs[] = [];
  public typeDoc: TypeDocs | undefined;
  // provider: Provider = {} as Provider
  public provider: Provider[] = [];
  titulo: String = ''
  subtitulo: String = ''
  constructor(private readonly _matDialogRef: MatDialogRef<ManageProvidersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: adminPopUp<number>,
    private formBuilder: FormBuilder,
   private readonly providerService: ProviderService,
    private _TipodocumentoHttpService: TipodocumentoHttpService
  ) {

  }
   providerForm = this.formBuilder.group({
    providerName: ['', [Validators.required, Validators.maxLength(35)]],
    providerAddress: ['', Validators.required],
    providerContact: ['', [Validators.required, Validators.maxLength(10), Validators.pattern("[0-9]{10}")]],
    providerEmail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    providerDetails: ['', [Validators.required, Validators.maxLength(151)]],
    providerNumDoc: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern(/^\d+$/)]],
    providerDoctype: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern(/^\d+$/)]],
  })
  ngOnInit(): void {
    // this.getTypeDocs()
    const { tipo, campo } = this.data
    this.titulo =
      this.data.tipo === 'crear' ? 'Crear nuevo Proveedor' : 'Actualizar proveedor';
    this.subtitulo =
      this.data.tipo === 'crear' ? 'Ingrese los datos para crear un nuevo proveedor' : 'Ingrese los nuevos datos del proveedor'
  }

  getAllTypeDocs() {
    this._TipodocumentoHttpService.getAllTypeDocuments()
      .subscribe((data: TypeDocs[]) => {
        this.typeDocs = data;
        console.log(data);
      })
  }
  findTypeDoc() {
    const typeDoc = Number(this.providerForm.get('tipoDocumento')?.value);
    if (typeDoc) {

      this._TipodocumentoHttpService.getTypeDocsById(typeDoc).subscribe((data) => {
        this.typeDoc = data;
        console.log(data);
      })
    }
  }

  onSubmit(): void {
    if (this.providerForm.invalid) {
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
  public cerrarDialog(){
    this._matDialogRef.close()
  }
  // solo deja incluir letras
  onNameInput(event: any): void {
    const input = event.target.value;
    event.target.value = input.replace(/[^A-Za-z ]/g, '');
  }

}
