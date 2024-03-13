import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-support',
  templateUrl: './support-view.component.html',
  styleUrls: ['./support-view.component.scss']
})
export class SupportComponent {

  personName: string = '';
  messagePerson: string = '';
  sendMessage: any[][] = [[], []];
  supportForm!: FormGroup;


  public readonly supportForm: UntypedFormGroup;

  constructor(private fb: FormBuilder, private renderer: Renderer2, private el: ElementRef) {

    this.supportForm = this.fb.group({
      namePerson: ['', Validators.required],
      messagePerson: ['', Validators.required]
    });
  }


  saveEmail() {
    // Guardado de nombre y mensaje en el arreglo de sendMessage
    this.sendMessage[0].push(this.personName);
    this.sendMessage[1].push(this.messagePerson);
    // Limpiado de las variables de nombre y mensaje despues de guardar
    this.personName = '';
    this.messagePerson = '';
    // Mostrar en consola
    console.log('Nombre guardado: ', this.personName, 'Email guardado: ', this.messagePerson);
  }

}
function ngOnInit() {
  throw new Error('Function not implemented.');
}