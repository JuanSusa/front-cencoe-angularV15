import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeDocs } from 'src/app/core/main.type';
import { TipodocumentoHttpService } from '../services/tipo-documento.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipodocumento',
  templateUrl: './tipodocumento.component.html',
  styleUrls: ['./tipodocumento.component.scss']
})
export class TipodocumentoComponent implements OnInit {

  public typeDocs: TypeDocs[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private _TipodocumentoHttpService: TipodocumentoHttpService
  ) { }

  typeDocForm: FormGroup = this.formBuilder.group({
    docTypeName: ['', Validators.required]
  })

  ngOnInit(): void {
    this.getAllTypeDocs()
  }

  getAllTypeDocs() {
    this._TipodocumentoHttpService.getAllTypeDocuments()
      .subscribe(data => {
        this.typeDocs = data;
        console.log(data)
      })
  }

  saveTypeDoc(): void {
    if (this.typeDocForm.invalid) {
      console.log('formulario invalido');
      return;
    }

    const docTypeName = this.typeDocForm.value.docTypeName;

    this._TipodocumentoHttpService.saveTypeDocument(this.typeDocForm.value).subscribe(
      dataResponse => {
        if (dataResponse && dataResponse.data && dataResponse.data.docTypeName) {
          Swal.fire({
            title: 'Nuevo Registro',
            text: `¡Tipo de documento ${docTypeName} creado con éxito!`,
            icon: 'success'
          }).then(() =>{
            this.getAllTypeDocs(); // Obtener la lista actualizada después de agregar un nuevo tipo de documento
            this.typeDocForm.reset(); // Limpiar el formulario después de agregar un nuevo tipo de documento
          }) 
        } else {
          console.error('Respuesta del servidor no válida:', dataResponse);
          // Puedes manejar este caso como un error también
        }
      },
      error => {
        console.error('Error al guardar el tipo de documento:', error);

      }
    );
  }

  // saveTypeDoc(): void {
  //   const { invalid, value } = this.typeDocForm;

  //   if (invalid) {
  //     console.log('formulario invalido');
  //     return; // Detener la ejecución si el formulario es inválido
  //   }

  //   this._TipodocumentoHttpService.saveTypeDocument(value as TypeDocs).subscribe(
  //     (dataResponse) => {
  //      if (dataResponse && dataResponse.data && dataResponse.data.docTypeName) {
  //       const docTypeName = dataResponse.data.docTypeName;

  //       Swal.fire(
  //         'Nuevo Registro',
  //         `¡tipo de documento ${docTypeName} creado con éxito!`,
  //         'success'
  //       );

  //       // Obtener la lista actualizada después de agregar un nuevo tipo de documento
  //       this._TipodocumentoHttpService.getAllTypeDocuments().subscribe((updatedList) => {
  //         this.typeDocs = updatedList;
  //       });

  //       // Navegar a la página de tipo de documento después de la operación exitosa
  //       this.router.navigate(['/tipo-documento']);
  //     } else {
  //       console.error('Respuesta del servidor no válida:', dataResponse);
  //       // Puedes manejar este caso como un error también
  //     }
  //   },
  //   (error) => {
  //     console.error('Error en la suscripción:', error);
  //     // Puedes manejar el error aquí según tus necesidades
  //   }
  // );

  // }
}
