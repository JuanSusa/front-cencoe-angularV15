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
  // provider: Provider = {} as Provider

  public readonly providerForm: UntypedFormGroup;
  public typeDocs: TypeDocs[] = [];
  public typeDoc: TypeDocs | undefined;
  public provider: Provider[] = [];
  titulo: String = ''
  subtitulo: String = ''

  constructor(
    private _TipodocumentoHttpService: TipodocumentoHttpService,
    private _providerServiceHttp: ProviderService,
    private _matDialogRef: MatDialogRef<ManageProvidersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: adminPopUp<number>,
    private formBuilder: FormBuilder,
  ) {
    this.providerForm = formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(35)]],
      adress: ['', Validators.required],
      contact: ['', [Validators.required, Validators.maxLength(10), Validators.pattern("[0-9]{10}")]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      details: ['', [Validators.required, Validators.maxLength(151)]],
      numDocumento: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern(/^\d+$/)]],
      tipoDocumento: ['', Validators.required],
    })
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * @remarks
   * Este método se utiliza para realizar tareas de inicialización al cargar el componente.
   * 
   * @returns No devuelve ningún valor.
   */
  ngOnInit(): void {
    // this.getTypeDocs()
    const { tipo, campo } = this.data
    this.titulo =
      this.data.tipo === 'crear' ? 'Crear nuevo Proveedor' : 'Actualizar proveedor';
    this.subtitulo =
      this.data.tipo === 'crear' ? 'Ingrese los datos para crear un nuevo proveedor' : 'Ingrese los nuevos datos del proveedor';
    if (tipo === 'editar') {
      this._providerServiceHttp.getProviderById(campo!).subscribe((provider) => {
        this.providerForm.get('providerId')?.patchValue(provider.providerId);
        this.providerForm.get('providerName')?.patchValue(provider.providerName);
        this.providerForm.get('providerContact')?.patchValue(provider.providerContact);
        this.providerForm.get('providerAddress')?.patchValue(provider.providerAddress);
        this.providerForm.get('providerDetails')?.patchValue(provider.providerDetails);
        this.providerForm.get('providerEmail')?.patchValue(provider.providerEmail);
        this.providerForm.get('providerDocument')?.patchValue(provider.providerDoctype?.docTypeId);
      });
    }
    this.getAllTypeDocs()
  }

  /**
    * Recupera todos los tipos de documentos del servidor.
    * @returns Un Observable que emite un array de TypeDocs.
    */
  getAllTypeDocs() {
    this._TipodocumentoHttpService.getAllTypeDocuments()
      .subscribe((data: TypeDocs[]) => {
        this.typeDocs = data;
        console.log(data);
      })
  }

  findTypeDoc() {
    const typeDoc = this.providerForm.get('providerDocument')?.value;
    if (typeDoc) {
      this._TipodocumentoHttpService.getTypeDocsById(typeDoc).subscribe((data) => {
        this.typeDoc = data;
        console.log(data);
      })
    }
  }

  /**
 * Muestra un mensaje de ejecución para indicar el resultado de una transacción.
 * 
 * @param tipo - El tipo de transacción ('crear' o 'actualizar').
 * @param message - El mensaje a mostrar en el diálogo.
 */
  private mostrarMensajeEjecucion(tipo: any, message: any) {
    const tipoMensaje = tipo == 'crear' ? 'Creado' : 'Actualizado';
    Swal.fire(
      'Operación exitosa',
      `El proveedor ha sido ${tipoMensaje} con exito`,
      'success'
    );
    this._matDialogRef.close(true);
  }

  /**
   * Obtiene los datos del usuario a partir del formulario.
   * 
   * @param esTipoCrear Indica si se trata de un tipo de creación de usuario.
   * @returns Los datos del usuario obtenidos del formulario.
   */
  private getProviderById(esTipoCrear: boolean) {
    let provider = this.providerForm.value;

    if (!esTipoCrear) {
      const providerId = this.providerForm.get('providerId')!.value;
      provider = { ...provider, providerId };
    }
    return provider;
  }

  public cerrarDialog() {
    this._matDialogRef.close()
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
}