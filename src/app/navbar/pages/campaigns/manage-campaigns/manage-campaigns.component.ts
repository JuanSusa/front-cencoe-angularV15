import { Component, Inject } from '@angular/core';
import { adminPopUp } from 'src/app/core/main.type';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupServiceService } from '../../groups/services/http/group-service.service';
import { ProviderService } from '../../providers/services/provider-service.service';
import { CampaignsServiceService } from '../services/http/campaigns-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-campaigns',
  templateUrl: './manage-campaigns.component.html',
  styleUrls: ['./manage-campaigns.component.scss']
})
export class ManageCampaignsComponent {
  // Definir el formulario y la expresión regular para el campo del documento

  titulo: string = '';
  subtitulo: string = '';
  // public team = [] //:Team[]
  campaignForm: FormGroup;
  maxDate: Date;

  constructor(
    public dialog: MatDialog,
    private _campaignServiceHttp: CampaignsServiceService,
    private _matDialogRef: MatDialogRef<ManageCampaignsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: adminPopUp<number>,//^3
    private formBuilder: FormBuilder,
    private _GroupService: GroupServiceService,
    private _ProviderService: ProviderService,
  ) {
    this.maxDate = new Date();
    this.campaignForm = new FormGroup({});
    this.campaignForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      fechaInicio: ['', Validators.required],
      fechaFinal: ['', [Validators.required, this.fechaFinalValidador.bind(this)]],
      observaciones: ['', Validators.maxLength(151)],
      estado: ['', [Validators.required]],
      grupos: ['', [Validators.required]]
    });
  }

  /**
 * Método que se ejecuta al inicializar el componente.
 * 
 * @remarks
 * Este método se utiliza para realizar tareas de inicialización al cargar el componente.
 * 
 * @returns No devuelve ningún valor.
 */

  ngOnInit(): void {
    //^5
    // this.getAllGroups()

    const { tipo, campo } = this.data;

    this.titulo =
      this.data.tipo === 'crear' ? 'Crear nueva Campaña' : 'Actualizar Campaña';
    this.subtitulo =
      this.data.tipo === 'crear' ? 'Ingrese los datos para crear un nueva Campaña' : 'Ingrese los nuevos datos de la Campaña';

    if (tipo == 'editar') {
      this._campaignServiceHttp.getCampaignById(campo!).subscribe((campaign) => {
        this.campaignForm.get('campaignId')?.patchValue(campaign.campaignId);
        this.campaignForm.get('campaignName')?.patchValue(campaign.campaignName);
        this.campaignForm.get('campaignObservations')?.patchValue(campaign.campaignObservations);
        this.campaignForm.get('campaignStartDate')?.patchValue(campaign.campaignStartDate);
        this.campaignForm.get('campaignEndDate')?.patchValue(campaign.campaignEndDate);
        this.campaignForm.get('campaignState')?.patchValue(campaign.campaignState);
      });
    };
  }

  private mostrarMensajeEjecucion(tipo: any, message: any) {
    const tipoMensaje = tipo == 'crear' ? 'Creada' : 'Actualizada';
    Swal.fire(
      '¡Operacion exitosa!',
      `La campaña ha sido ${tipoMensaje} con exito`,
      'success'
    );
    this._matDialogRef.close(true);
  }

  /**
 * Obtiene los datos del usuario a partir del formulario.
 * 
 * @param esTipoCrear Indica si se trata de un tipo de creación de usuario.
 * @returns Los datos del usuario obtenidos del formulario.
 */

  private getCampaingById(esTipoCrear: boolean) {
    let campaign = this.campaignForm.value;
    if (!esTipoCrear) {
      const campaignId = this.campaignForm.get('campaignId')!.value;
      campaign = { ...campaign, campaignId};
    }
    return campaign;
  }

  public closeDialog() {
    this._matDialogRef.close();
  }

  //^6
  onNumericInput(event: any): void {//^6.1
    // Filtrar caracteres no numéricos
    const input = event.target.value;//^6.2
    event.target.value = input.replace(/[^0-9]/g, '');//^6.3
  }
  // getAllGroups(){
  //   if(this._GroupService){
  //     this._GroupService.getAllGroups()
  //     .subscribe((data : Team[]) =>{
  //       this.team = data
  //       console.log(data)
  //     })
  //   }
  // }
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

