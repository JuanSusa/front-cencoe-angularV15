import { Component, Inject } from '@angular/core';
import { User, adminPopUp } from 'src/app/core/main.type';
import { FormBuilder, UntypedFormArray, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipodocumentoHttpService } from '../../tipodocumento/services/tipo-documento.service';
import { TypeDocs } from '../../tipodocumento/core/models/main.model';
import Swal from 'sweetalert2';
import { CustomerServiceService } from '../service/http/customer-service.service';
import { Customer } from '../core/models/main.model';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.scss'],
})

export class ManageCustomersComponent {
  public readonly customerForm: UntypedFormGroup;
  public customer: Customer[] = [];
  public typeDocs: TypeDocs[] = [];
  public typeDoc: TypeDocs | undefined;

  constructor(
    private _TipodocumentoHttpService: TipodocumentoHttpService,
    private _customerServiceHttp: CustomerServiceService,
    private _matDialogRef: MatDialogRef<ManageCustomersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: adminPopUp<number>, //^3
    private formBuiler: FormBuilder,
  ) {
    this.customerForm = this.formBuiler.group({
      customerDocument: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11), Validators.pattern(/^\d+$/)]],
      customerName: ['', Validators.required],
      customerLastName: ['', Validators.required],
      customerAdress: ['', Validators.required, Validators.minLength(3)],
      customerPhone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^\d+$/)]],
      customerState: [''],
      customerTipoDocumento: ['', Validators.required],
    })
  }

  // Variables de titulo y subtitulo en la página
  titulo: string = '';
  subtitulo: string = '';

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
    const { tipo, campo } = this.data;
    this.titulo =
      this.data.tipo === 'crear' ? ' Crear nuevo cliente' : 'Actualizar cliente';
    this.subtitulo =
      this.data.tipo === 'crear' ? 'Ingrese los datos para crear un nuevo cliente' : 'Ingrese los nuevos datos del cliente';

    if (tipo == 'editar') {
      this._customerServiceHttp.getCustomerById(campo!).subscribe((Customer) => {
        this.customerForm.get('customerId')?.patchValue(Customer.customerId);
        this.customerForm.get('customerName')?.patchValue(Customer.customerName);
        this.customerForm.get('customerPhone')?.patchValue(Customer.customerPhone);
        this.customerForm.get('customerAddress')?.patchValue(Customer.customerAddress);
        this.customerForm.get('customerState')?.patchValue(Customer.customerState);
      })
    }

  }

  // createCustomer(): void {
  //   const { invalid, value } = this.customerForm;
  //   if (invalid) {
  //     Swal.fire(
  //       'Porfavor espere',
  //       'Existen campos que no son validos',
  //       'warning'
  //     );
  //     return console.log('Formulario invalido', value);
  //   }
  //   const { tipo, campo } = this.data;
  //   const esTipoCrear = tipo === 'crear';
  //   const metodoEjecutar: keyof userHttpService = esTipoCrear
  //   ? 'createCustomer'
  //   : 'updateCustomer';
  //   const customer = this.getCustomerById(esTipoCrear);
  //   this._customerServiceHttp[metodoEjecutar](customer).subscribe({
  //     next: (mensaje) => this.mostrarMensajeEjecucion(tipo, mensaje),
  //     error: (error) => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: error.message,
  //       });
  //     }
  //   })
  //   return console.log('Formulario invalido', value)
  // }

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

  /**
    * Encuentra el tipo de documento basado en el valor seleccionado en userForm.
    */
  findTypeDoc() {
    const typeDoc = this.customerForm.get('userTipoDocumento')?.value;
    if (typeDoc) {

      this._TipodocumentoHttpService.getTypeDocsById(typeDoc).subscribe((data) => {
        this.typeDoc = data;
        console.log(data);
      })
    }
  }

  private mostrarMensajeEjecucion(tipo: any, message: any) {
    const tipoMensaje = tipo == 'crear' ? 'Creado' : 'Actualizado';
    Swal.fire(
      'Operación exitosa',
      `El cliente ha sido ${tipoMensaje} con exito`,
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

  private getCustomerById(esTipoCrear: boolean) {
    let customer = this.customerForm.value;
    if (!esTipoCrear) {
      const customerId = this.customerForm.get('customerId')!.value;
      customer = { ...customer, customerId };
    }
    return customer;
  }

  public closeDialog() {
    this._matDialogRef.close();
  }

  onSubmit(): void {
    if (this.customerForm.invalid) {
      Swal.fire(
        'Por favor espere',
        'Existen campos que no son validos',
        'warning'
      );
      return;
    }
  }

  onNumericInput(event: any): void {//^6.1
    // Filtrar caracteres no numéricos
    const input = event.target.value;//^6.2
    event.target.value = input.replace(/[^0-9]/g, '');//^6.3
  }
  // solo deja incluir letras
  onNameInput(event: any): void {
    const input = event.target.value;
    event.target.value = input.replace(/[^A-Za-z ]/g, '');
  }
}
