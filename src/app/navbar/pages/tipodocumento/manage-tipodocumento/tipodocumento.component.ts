import { map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeDocs } from 'src/app/core/main.type';
import { TipodocumentoHttpService } from '../services/tipo-documento.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSelectionListChange } from '@angular/material/list';


@Component({
  selector: 'app-tipodocumento',
  templateUrl: './tipodocumento.component.html',
  styleUrls: ['./tipodocumento.component.scss']
})
export class TipodocumentoComponent implements OnInit {

  public typeDocs: TypeDocs[] = [];
  public selectedItemsList: any[] = [];
  public enableButton: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private _tipodocumentoHttpService: TipodocumentoHttpService
  ) { }

  typeDocForm = this.formBuilder.group({
    docTypeName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]]
  })

  ngOnInit(): void {
    this.getAllTypeDocs()
  }

  getAllTypeDocs() {
    this._tipodocumentoHttpService.getAllTypeDocuments()
      .subscribe(data => {
        this.typeDocs = data;
        console.log(data)
      })
  }

  saveTypeDoc(): void {
    if (this.typeDocForm.valid) {
      const newTypeDoc: TypeDocs = {
        docTypeName: this.typeDocForm.value.docTypeName || '',
        docTypeId: null
      };

      this._tipodocumentoHttpService.saveTypeDocument(newTypeDoc).subscribe(
        (response) => {
          console.log(response)

          this.typeDocs.push(response);
          Swal.fire('Éxito',
            `Tipo de documento creado exitosamente ${response.docTypeName}`,
            'success');
          this.typeDocForm.reset();
        }, error => {
          console.error('Error al crear tipo de documento', error);
          Swal.fire(
            'Error',
            'Ocurrió un error al crear el tipo de documento',
            'error');
        });
    }
  }

  deleteSelectedItems() {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta acción eliminará los tipos de documentos seleccionados. ¿Desea continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff0844',
      cancelButtonColor: '#485563',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmDelete();
      }
    });
  }


  confirmDelete() {
    for (const selectTypeDocs of this.selectedItemsList) {
      if (selectTypeDocs && selectTypeDocs.docTypeId) {
        console.log('Deleting Doc with ID:', selectTypeDocs.docTypeId);
        this._tipodocumentoHttpService.deleteTypeDoc(selectTypeDocs.docTypeId!).subscribe(() => {
          this.typeDocs = this.typeDocs.filter(doc => doc.docTypeId !== selectTypeDocs.docTypeId);
          Swal.fire('Éxito',
            `Tipo de documento eliminado exitosamente`,
            'success');
          this.enableButton = false;
        })
      }
    }
  }

  // deleteSelectedItems() {
  //   this.selectedItemsList.forEach(item => {
  //     this._tipodocumentoHttpService.deleteTypeDoc(item.docTypeId).subscribe(() => {
  //       this.getAllTypeDocs()
  //     })
  //   });
  // }

  onSelectionChange(event: MatSelectionListChange) {
    this.selectedItemsList = event.source.selectedOptions.selected.map(option => option.value);
    console.log(this.selectedItemsList)
    this.enableButton = this.selectedItemsList.length > 0 ? true : false;
  }

}
