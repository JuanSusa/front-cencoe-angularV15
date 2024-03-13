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
    // private _UsersService : userHttpService,
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
  }

  //^4
  groupForm = this.formBuilder.group({
    groupName: ['', [Validators.required, Validators.pattern(/^\D+$/)]],
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
  //^6
  onNumericInput(event: any): void {//^6.1
    // Filtrar caracteres no numéricos
    const input = event.target.value;//^6.2
    event.target.value = input.replace(/[^0-9]/g, '');//^6.3
  }
  // getAllUsers(){
  //   if(this._UsersService){
  //     this._UsersService.getAllUsers()
  //     .subscribe((data : User[]) =>{
  //       this.user = data
  //       console.log(data)
  //     })
  //   }
  // }
}
