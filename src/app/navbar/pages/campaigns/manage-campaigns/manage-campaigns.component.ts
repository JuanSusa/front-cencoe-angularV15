import { Component, Inject } from '@angular/core';
import { Provider, Team, adminPopUp } from 'src/app/core/main.type';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
<<<<<<< HEAD
import { FormBuilder, Validators } from '@angular/forms';
=======
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
>>>>>>> fb630f9d8d8d0d491c4b93720e5c3eec67600be2
import { GroupServiceService } from '../../groups/services/http/group-service.service';
import { ProviderService } from '../../providers/services/provider-service.service';
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
<<<<<<< HEAD
    private _GroupService : GroupServiceService,
    private _providerService: ProviderService
    ) { this.maxDate = new Date();}
    campaignForm = this.formBuilder.group({
      id : ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      nombre : ['', [Validators.required, Validators.maxLength(10)]],
      fechaInicio : ['', [Validators.required, Validators.maxLength(20)]],
      fechaFinal : ['', [Validators.required, Validators.maxLength(20)]],
      observaciones: ['', [Validators.required, Validators.maxLength(100)]],
      grupos : ['', [Validators.required]],

    })
  titulo: string = '';
  subtitulo: string = '';
=======
    private _GroupService : GroupServiceService
    ) {
      this.maxDate = new Date();
      this.campaignForm = new FormGroup({});
    }

>>>>>>> fb630f9d8d8d0d491c4b93720e5c3eec67600be2
  ngOnInit(): void {
    //^5
    this.getAllGroups()

    const { tipo, campo } = this.data;
    this.titulo =
      this.data.tipo === 'crear' ? 'Crear nueva Campaña': 'Actualizar Campaña';
    this.subtitulo =
<<<<<<< HEAD
      this.data.tipo === 'crear' ? 'Ingrese los datos para crear un nueva nueva Campaña' : this.data.tipo === 'ver' ? 'Detalles del Campaña' : 'Ingrese los nuevos datos de la Campaña';
  }
  public showButton(){
    this.showBtn=!this.showBtn
  }
  //^4
=======
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

>>>>>>> fb630f9d8d8d0d491c4b93720e5c3eec67600be2
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
<<<<<<< HEAD
}
=======
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
>>>>>>> fb630f9d8d8d0d491c4b93720e5c3eec67600be2
