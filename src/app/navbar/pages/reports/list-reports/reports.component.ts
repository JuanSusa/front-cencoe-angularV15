import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent{
  maxDate: Date;
  

  constructor(
    public formBuilder: FormBuilder,
  ) { this.maxDate = new Date(); 
  }
   reportForm = this.formBuilder.group({
    reportsName: ['', [Validators.required]],
    customerTipodeReporte: ['', Validators.required],
    fechaInicio: ['', Validators.required],
    fechaFinal: ['', Validators.required],
    observaciones: ['', [Validators.required]],
    descargar: ['']
  });

}
