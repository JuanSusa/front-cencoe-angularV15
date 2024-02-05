import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { identity } from 'rxjs';
import { Campaign } from 'src/app/interfaces/campaign';

@Component({
  selector: 'app-editar-campaign',
  templateUrl: './editar-campaign.component.html',
  styleUrls: ['./editar-campaign.component.css']
})

export class EditarCampaignComponent implements OnInit{
  tipoEstado: string [] = ['Asignado','En curso','Terminado'];
  form: FormGroup;
  maxDate: Date;
  index: number | undefined;
constructor(public dialogRef: MatDialogRef<EditarCampaignComponent>, private fb: FormBuilder, private dateAdapter: DateAdapter<any>, @Inject(MAT_DIALOG_DATA) public data: any){

  this.maxDate = new Date();
  this.form = this.fb.group({
    id : [ '',[Validators.required, Validators.pattern("^[0-9]*$")]],
    nombre : ['' , [Validators.required , Validators.maxLength(20)]],
    capacidad : ['' , [Validators.required, Validators.maxLength(20)]],
    fechaInicio : ['null' , [Validators.required , Validators.maxLength(20)]],
    fechaFinal : ['null' ,[ Validators.required, Validators.maxLength(20)]],
    observaciones: ['' ,[Validators.required, Validators.maxLength(100)]],
    estado : ['null' , [Validators.required, Validators.maxLength(20)]]
  })
  this.index = data.index;
  dateAdapter.setLocale('es');
}

  ngOnInit(): void {

  }

  cancelar(){
    this.dialogRef.close();

  }
  addEditarCampaign(){
    const campaign: Campaign = {
      campaign_id: this.form.value.id,
      campaign_name: this.form.value.nombre,
      campaign_capacity: this.form.value.cantidad,
      campaign_start_date: this.form.value.fechaInicio,
      campaign_end_date: this.form.value.fechaFin,
      campaign_observations: this.form.value.observaciones,
      campaign_state: this.form.value.estado
    }
  }

}
