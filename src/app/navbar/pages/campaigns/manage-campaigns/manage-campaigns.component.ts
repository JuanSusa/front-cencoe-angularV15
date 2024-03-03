import { Component, Inject } from '@angular/core';
import { Team, adminPopUp } from 'src/app/core/main.type';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupServiceService } from '../../groups/services/http/group-service.service';


@Component({
  selector: 'app-manage-campaigns',
  templateUrl: './manage-campaigns.component.html',
  styleUrls: ['./manage-campaigns.component.scss']
})
export class ManageCampaignsComponent {
  titulo: string = '';
  subtitulo: string = '';
  public team:Team[]=[]
  campaignForm : FormGroup;
  maxDate: Date;
  constructor(
    public dialog: MatDialog,
    private readonly _matDialogRef: MatDialogRef<ManageCampaignsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: adminPopUp<number>,//^3
    private formBuilder: FormBuilder,
    private _GroupService : GroupServiceService
    ) {
      this.maxDate = new Date();
      this.campaignForm = new FormGroup({});
    }

  ngOnInit(): void {
    //^5
    this.getAllGroups()
    const { tipo, campo } = this.data;
    this.titulo =
      this.data.tipo === 'crear' ? 'Crear nueva Campaña': 'Actualizar Campaña';
    this.subtitulo =
      this.data.tipo === 'crear' ? 'Ingrese los datos para crear un nueva Campaña': 'Ingrese los nuevos datos de la Campaña';

      this.campaignForm = this.formBuilder.group({
        nombre: ['', [Validators.required]],
        fechaInicio: ['', Validators.required],
        fechaFinal: ['', [Validators.required, this.fechaFinalValidador.bind(this)]],
        observaciones: ['', Validators.maxLength(151)],
        estado: ['', [Validators.required]],
        grupos: ['', [Validators.required]]
      });
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
  getAllGroups(){
    if(this._GroupService){
      this._GroupService.getAllGroups()
      .subscribe((data : Team[]) =>{
        this.team = data
        console.log(data)
      })
    }
  }
  fechaFinalValidador(control: FormControl) {
    const fechaInicio = this.campaignForm.get('fechaInicio')?.value;
    const fechaFinal = control.value;

    if (!fechaInicio || !fechaFinal) {
      return null; // No se realiza la validación si alguna de las fechas es null
    }

    // Convertir fechas a objetos Date para comparación
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinalDate = new Date(fechaFinal);

    if (fechaFinalDate.getTime() === fechaInicioDate.getTime()) {
      return { mismaFecha: true }; // Retorna error si las fechas son iguales
    }

    return null; // Retorna null si no hay errores
  }

}