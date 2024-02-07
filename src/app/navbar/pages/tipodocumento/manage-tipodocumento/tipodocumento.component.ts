import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TypeDocs } from 'src/app/core/main.type';
import { TipodocumentoHttpService } from '../services/tipo-documento.service';

@Component({
  selector: 'app-tipodocumento',
  templateUrl: './tipodocumento.component.html',
  styleUrls: ['./tipodocumento.component.scss']
})
export class TipodocumentoComponent implements OnInit{

  public typeDocs: TypeDocs[] = []; 
  
  constructor(
    private formBuilder: FormBuilder,
    private _TipodocumentoHttpService: TipodocumentoHttpService
  ){}
  ngOnInit(): void {
    this.getAllTypeDocs()
  }

  getAllTypeDocs(){
    this._TipodocumentoHttpService.getAllTypeDocuments()
    .subscribe(data =>{
      this.typeDocs= data;
      console.log(data)
    })
  }
  typeDocForm = this.formBuilder.group({
    docTypeName: ['', Validators.required]
  })

}
