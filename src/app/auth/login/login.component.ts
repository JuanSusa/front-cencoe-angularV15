import { Component, ElementRef, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { adminPopUp } from 'src/app/core/main.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  styles: [`
    body {
      background: linear-gradient(to bottom, #ff0844 0%, #ffb199 100%);
    }
  `],
})

export class LoginComponent {
  login_form: FormGroup;
  recuperar_form: FormGroup;
  constructor(private fb: FormBuilder, private renderer: Renderer2, private el: ElementRef) {
    this.login_form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.recuperar_form = new FormGroup({
      username_recuperar: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  };
  prueba = false;
  iniciarSesion() {
    const cajaTraseraLogin = document.querySelector('.cajaTraseraLogin');
    const cajaTraseraRecuperar = document.querySelector('.cajaTraseraRecuperar');
    const contenedorLoginRecuperar = document.querySelector('.contenedorLoginRecuperar');
    const formularioLogin = document.querySelector('.formularioLogin');
    const formularioRecuperar = document.querySelector('.formularioRecuperar');
    const btnIniciarSesion = document.querySelector('.btnIniciarSesion');
    if (this.prueba) {
      this.prueba = false;
      formularioRecuperar?.setAttribute('style', 'display:none');
      contenedorLoginRecuperar?.setAttribute('style', 'left:10px');
      formularioLogin?.setAttribute('style', 'display:block');
      cajaTraseraRecuperar?.setAttribute('style', 'opacity:1');
      cajaTraseraLogin?.setAttribute('style', 'opacity:0');
      btnIniciarSesion?.setAttribute('style', 'display:none');
    } else {
      this.prueba = true;
      formularioRecuperar?.setAttribute('style', 'display:none');
      contenedorLoginRecuperar?.removeAttribute('style');
      formularioLogin?.setAttribute('style', 'display:none');
      cajaTraseraRecuperar?.removeAttribute('style');
      cajaTraseraLogin?.removeAttribute('style');
    }
  }
  recuperar() {
    const cajaTraseraLogin = document.querySelector('.cajaTraseraLogin');
    const cajaTraseraRecuperar = document.querySelector('.cajaTraseraRecuperar');
    const contenedorLoginRecuperar = document.querySelector('.contenedorLoginRecuperar');
    const formularioLogin = document.querySelector('.formularioLogin');
    const formularioRecuperar = document.querySelector('.formularioRecuperar');
    if (this.prueba) {
      this.prueba = false;
      formularioRecuperar?.setAttribute('style', 'display:block');
      contenedorLoginRecuperar?.setAttribute('style', 'left:410px');
      formularioLogin?.setAttribute('style', 'display:block');
      cajaTraseraRecuperar?.setAttribute('style', 'opacity:0');
      cajaTraseraLogin?.setAttribute('style', 'opacity:1');
    } else {
      this.prueba = true;
      formularioRecuperar?.removeAttribute('style');
      contenedorLoginRecuperar?.removeAttribute('style');
      formularioLogin?.removeAttribute('style');
      cajaTraseraRecuperar?.removeAttribute('style');
      cajaTraseraLogin?.removeAttribute('style');
      cajaTraseraLogin?.removeAttribute('style');
    }
  }
  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background', 'linear-gradient(to right, #d7d2cc 0%, #304352 100%)')
  }
}