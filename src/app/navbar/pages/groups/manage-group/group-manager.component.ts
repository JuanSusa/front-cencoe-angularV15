import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { adminPopUp } from 'src/app/core/main.type';
import { MatDialog } from '@angular/material/dialog';
import { SelectUserComponent } from '../select-user/select-user.component';

@Component({
  selector: 'app-group-manager',
  templateUrl: './group-manager.component.html',
  styleUrls: ['./group-manager.component.scss']
})

export class GroupManagerComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private readonly _matDialogRef: MatDialogRef<GroupManagerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: adminPopUp<number>,//^3
    private formBuilder: FormBuilder

  ) { }


  selectUser(): void {
    const dialogRef = this.dialog.open(SelectUserComponent, {
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
      this.data.tipo === 'crear' ? 'Crear nuevo grupo' : this.data.tipo === 'ver' ? 'Detalles del Grupo' : 'Editar Grupo';
    this.subtitulo =
      this.data.tipo === 'crear' ? 'Ingrese los datos para crear un nuevo grupo' : this.data.tipo === 'ver' ? 'Detalles del Grupo' : 'Ingrese los nuevos datos del grupo';
    debugger


  }

  //^4
  groupForm = this.formBuilder.group({
    groupDocument: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11), Validators.pattern(/^\d+$/)]],
    groupName: ['', Validators.required],
    groupLastName: ['', Validators.required],
    groupAddress: ['', [Validators.required, Validators.minLength(3)]],
    groupPhone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^\d+$/)]],
    groupPassword: ['', [Validators.required, Validators.minLength(10), this.passwordValidator]],
    groupState: [''],
    groupTipoDocumento: ['']
  })

  public executionMesssage() {
    this._matDialogRef.close();
  }

  //^6
  onNumericInput(event: any): void {//^6.1
    // Filtrar caracteres no numéricos
    const input = event.target.value;//^6.2
    event.target.value = input.replace(/[^0-9]/g, '');//^6.3
  }

  //^7
  passwordValidator(): ValidatorFn {//^7.1
    return (control: AbstractControl): ValidationErrors | null => {//^7.2
      const value: string = control.value;//^7.3
      const passwordCriteria = /[a-zA-Z]+.*[0-9]+.*[A-Z]+/.test(value);//^7.4

      if (!passwordCriteria) { //^7.5

        return { passwordCriteria: true };
      }
      return null;
    };
  }
}






