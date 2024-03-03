import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Team, User, adminPopUp } from 'src/app/core/main.type';
import { MatDialog } from '@angular/material/dialog';
import { userHttpService } from '../../users/service/http/user-service.service';
@Component({
  selector: 'app-group-manager',
  templateUrl: './group-manager.component.html',
  styleUrls: ['./group-manager.component.scss']
})
export class GroupManagerComponent implements OnInit {
  public team:Team[]=[]
  public user:User[]=[]
  public showBtn: boolean = false;
  maxDate: Date;
  constructor(
    public dialog: MatDialog,
    private readonly _matDialogRef: MatDialogRef<GroupManagerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: adminPopUp<number>,//^3
    private formBuilder: FormBuilder,
    private _UsersService : userHttpService,
  ) { this.maxDate = new Date();}
  titulo: string = '';
  subtitulo: string = '';
  ngOnInit(): void {
    //^5
    const { tipo, campo } = this.data;
    this.titulo =
      this.data.tipo === 'crear' ? 'Crear nuevo grupo' : 'Actualizar Grupo';
    this.subtitulo =
      this.data.tipo === 'crear' ? 'Ingrese los datos para crear un nuevo grupo': 'Ingrese los nuevos datos del grupo';
    debugger
  }
  //^4
  groupForm = this.formBuilder.group({
    groupName: ['', Validators.required],
    groupLastName: ['', Validators.required],
    // fechaInicio : ['', Validators.required],
    // fechaFinal : ['', Validators.required],
    groupState: [''],
    integrantes: ['', Validators.required]

  })
  public showButton(){
    this.showBtn=!this.showBtn
  }
  //^4
  public executionMesssage() {
    this._matDialogRef.close();
  }
 
}
