import { TipodocumentoHttpService } from './../../tipodocumento/services/tipo-documento.service';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TypeDocs, adminPopUp } from 'src/app/core/main.type';
import { TipodocumentoComponent } from '../../tipodocumento/manage-tipodocumento/tipodocumento.component';
import { ProviderServiceService } from '../../providers/services/provider-service.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  public typeDocs: TypeDocs[] = [];
  
  
  constructor(
    private _TipodocumentoHttpService: TipodocumentoHttpService,
    private readonly _matDialogRef: MatDialogRef<ManageUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: adminPopUp<number>,//^3
    private formBuilder: FormBuilder,
   
    ) { }
    
    //^4
    userForm = this.formBuilder.group({
      userDocument: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11), Validators.pattern(/^\d+$/)]],
      userName: ['', Validators.required],
      userLastName: ['', Validators.required],
      userAddress: ['', [Validators.required, Validators.minLength(3)]],
      userPhone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^\d+$/)]],
      userPassword: ['', [Validators.required, Validators.minLength(10), this.passwordValidator]],
      userState: [''],
      userTipoDocumento: ['']
    })
    
    titulo: string = '';
    subtitulo: string = '';
    ngOnInit(): void {
      //^5
      const { tipo, campo } = this.data;
      this.titulo =
      this.data.tipo === 'crear' ? 'Crear nuevo usuario' : this.data.tipo === 'ver' ? 'Detalles del Usuario' : 'Editar Usuario';
    this.subtitulo =
      this.data.tipo === 'crear' ? 'Ingrese los datos para crear un nuevo usuario' : this.data.tipo === 'ver' ? 'Detalles del Usuario' : 'Ingrese los nuevos datos del usuario';

    this.getAllTypeDocs()

  }

  getAllTypeDocs() {
    if (this._TipodocumentoHttpService) {
      this._TipodocumentoHttpService.getAllTypeDocuments()
        .subscribe((data: TypeDocs[]) => {
          this.typeDocs = data;
          console.log(data)
        })
    }
  }

  


  public executionMesssage() {
    this._matDialogRef.close();
  }

  //^6
  onNumericInput(event: any): void {//^6.1
    // Filtrar caracteres no numéricos
    const input = event.target.value;//^6.2
    event.target.value = input.replace(/[^0-9]/g, '');//^6.3
  }

  //^7
  passwordValidator(): ValidatorFn {//^7.1
    return (control: AbstractControl): ValidationErrors | null => {//^7.2
      const value: string = control.value;//^7.3
      const passwordCriteria = /[a-zA-Z]+.*[0-9]+.*[A-Z]+/.test(value);//^7.4

      if (!passwordCriteria) { //^7.5

        return { passwordCriteria: true };
      }
      return null;
    };
  }
}
