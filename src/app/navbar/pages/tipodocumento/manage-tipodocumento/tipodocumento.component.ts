import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TypeDocs } from 'src/app/core/main.type';

@Component({
  selector: 'app-tipodocumento',
  templateUrl: './tipodocumento.component.html',
  styleUrls: ['./tipodocumento.component.scss']
})
export class TipodocumentoComponent {

  public typeDocs: TypeDocs[] = []; 
  
  constructor(
    private formBuilder: FormBuilder
  ){}

  typeDocForm = this.formBuilder.group({
    docTypeName: ['', Validators.required]
  })

}
