
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Campaign } from 'src/app/interfaces/campaign';
import { CampaignService } from 'src/app/services/campaign.service';


@Component({
  selector: 'app-crear-campaign',
  templateUrl: './crear-campaign.component.html',
  styleUrls: ['./crear-campaign.component.css']
})
export class CrearCampaignComponent {
  estado: string [] = ['Asignado','En curso','Terminado'];
  form: FormGroup;
  maxDate: Date;

constructor (public dialogRef: MatDialogRef<CrearCampaignComponent>, private fb: FormBuilder, private _campaignService: CampaignService, private router: Router, private _snackBar: MatSnackBar, private dateAdapter: DateAdapter<any>){
  this.maxDate = new Date();
  this.form = this.fb.group({
    id : ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    nombre : ['', [Validators.required, Validators.maxLength(20)]],
    capacidad : ['', [Validators.required, Validators.maxLength(20)]],
    fechaInicio : ['', [Validators.required, Validators.maxLength(20)]],
    fechaFinal : ['', [Validators.required, Validators.maxLength(20)]],
    observaciones: ['', [Validators.required, Validators.maxLength(100)]],
    estado : ['', [Validators.required, Validators.maxLength(20)]],
  })
  dateAdapter.setLocale('es');
}
ngOnInit(): void {
}

cancelar(){
  this.dialogRef.close();

  }
agregarCampaign(){
  const campaign: Campaign = {
    campaign_id: this.form.value.id,
    campaign_name : this.form.value.nombre,
    campaign_capacity: this.form.value.capacidad,
    campaign_start_date: this.form.value.fechaInicio,
    campaign_end_date: this.form.value.fechaFinal,
    campaign_observations: this.form.value.observaciones,
    campaign_state: this.form.value.estado,
  }
  this.router.navigate(['/dashboard/campaign']);
  this._campaignService.agregarCampaign(campaign);

  this._snackBar.open('La campaña fue agregado con exito','',{
    duration: 5000,
    horizontalPosition: 'end',
    verticalPosition: 'top'
  });
};

};
