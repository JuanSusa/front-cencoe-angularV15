import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { adminPopUp } from 'src/app/core/main.type';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-reports',
  templateUrl: './manage-reports.component.html',
  styleUrls: ['./manage-reports.component.scss']
})
export class ManageReportsComponent {
  public reports:[]=[]
  public showBtn: boolean = false;
  maxDate: Date;
  constructor(
    public dialog: MatDialog,
    private readonly _matDialogRef: MatDialogRef<ManageReportsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: adminPopUp<number>,//^3
    private formBuilder: FormBuilder,
  ) { this.maxDate = new Date();}

  titulo: string = '';
  subtitulo: string = '';
  ngOnInit(): void {
    //^5
    const { tipo, campo } = this.data;
    this.titulo =
      this.data.tipo === 'crear' ? 'Crear nuevo grupo' :'Editar Grupo';
    this.subtitulo =
      this.data.tipo === 'crear' ? 'Ingrese los datos para crear un nuevo grupo' : 'Ingrese los nuevos datos del grupo';
    debugger
  }
  reportsForm = this.formBuilder.group({
    reportsDocument: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11), Validators.pattern(/^\d+$/)]],
    reportsName: ['', Validators.required],
    reportsLastName: ['', Validators.required],
    fechaInicio : ['', [Validators.required, Validators.maxLength(20)]],
    fechaFinal : ['', [Validators.required, Validators.maxLength(20)]],
    
  })
  public executionMesssage(){this._matDialogRef.close();}
}
