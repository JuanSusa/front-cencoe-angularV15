import { Component, Inject } from '@angular/core';
import { adminPopUp } from 'src/app/core/main.type';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { SelectGroupComponent } from '../select-group/select-group.component';
import { SelectProvideComponent } from '../select-provide/select-provide.component';


@Component({
  selector: 'app-manage-campaigns',
  templateUrl: './manage-campaigns.component.html',
  styleUrls: ['./manage-campaigns.component.scss']
})
export class ManageCampaignsComponent {
  maxDate: Date;
  constructor(
    public dialog: MatDialog,
    private readonly _matDialogRef: MatDialogRef<ManageCampaignsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: adminPopUp<number>,//^3
    private formBuilder: FormBuilder
    ) { this.maxDate = new Date();}

    campaignForm = this.formBuilder.group({
      id : ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      nombre : ['', [Validators.required, Validators.maxLength(10)]],
      fechaInicio : ['', [Validators.required, Validators.maxLength(20)]],
      fechaFinal : ['', [Validators.required, Validators.maxLength(20)]],
      observaciones: ['', [Validators.required, Validators.maxLength(100)]],
      estado : ['', [Validators.required,]],
    })

    selectGroup(): void {
    const dialogRef = this.dialog.open(SelectGroupComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('La ventana emergente ha sido cerrada');
    });
  }

  selectProvide(): void {
    const dialogRef = this.dialog.open(SelectProvideComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('La ventana emergente ha sido cerrada');
    });
  }
  titulo: string = '';
  subtitulo: string = '';
  ngOnInit(): void {
    //^5
    const { tipo, campo } = this.data;
    this.titulo =
      this.data.tipo === 'crear' ? 'Crear nueva Campaña' : this.data.tipo === 'ver' ? 'Detalles de la Campaña' : 'Editar Campaña';
    this.subtitulo =
      this.data.tipo === 'crear' ? 'Ingrese los datos para crear un nueva nueva Campaña' : this.data.tipo === 'ver' ? 'Detalles del Campaña' : 'Ingrese los nuevos datos de la Campaña';


  }

  //^4


  public executionMesssage() {
    this._matDialogRef.close();
  }

   //^6
   onNumericInput(event: any): void {//^6.1
    // Filtrar caracteres no numéricos
    const input = event.target.value;//^6.2
    event.target.value = input.replace(/[^0-9]/g, '');//^6.3
  }


}

