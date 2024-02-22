import { Component, ElementRef, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { adminPopUp } from 'src/app/core/main.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {

  cambioL_R: boolean = false;
  loginForm: FormGroup;
  recoveryForm: FormGroup;

  constructor(private fb: FormBuilder, private renderer: Renderer2, private el: ElementRef) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.recoveryForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required]
    });
  };

  _logIn() {
    const _cambio_L_R = document.querySelector('.contenedorLoginRecuperar') as HTMLElement;
    const _formulario_L = document.querySelector('.formularioLogin') as HTMLElement;
    const _formulario_R = document.querySelector('.formularioRecuperar') as HTMLElement;
    const _caja_T_L = document.querySelector('.cajaTraseraLogin') as HTMLElement;
    const _caja_T_R = document.querySelector('.cajaTraseraRecuperar') as HTMLElement;
    const _btn_I_S = document.querySelector('.btnIniciarSesion') as HTMLElement;

    this.cambioL_R = !this.cambioL_R;
    _formulario_L.style.display = this.cambioL_R ? 'none' : 'block';
    _formulario_R.style.display = this.cambioL_R ? 'none' : 'block';

    _cambio_L_R.classList.toggle('cambio', this.cambioL_R);
    _caja_T_L.style.opacity = this.cambioL_R ? '0' : '1';
    _caja_T_R.style.opacity = this.cambioL_R ? '0' : '1';
    _btn_I_S.style.display = this.cambioL_R ? 'none' : 'block';
  }

  _recovery() {
    const _cambio_L_R = document.querySelector('.contenedorLoginRecuperar') as HTMLElement;
    const _formulario_L = document.querySelector('.formularioLogin') as HTMLElement;
    const _formulario_R = document.querySelector('.formularioRecuperar') as HTMLElement;
    const _caja_T_L = document.querySelector('.cajaTraseraLogin') as HTMLElement;
    const _caja_T_R = document.querySelector('.cajaTraseraRecuperar') as HTMLElement; 

    this.cambioL_R = !this.cambioL_R;
    _formulario_L.style.display = this.cambioL_R ? 'block' : 'none';
    _formulario_R.style.display = this.cambioL_R ? 'none' : 'block';
  }

  // login_form: FormGroup;
  // recuperar_form: FormGroup;
  // constructor(private fb: FormBuilder, private renderer: Renderer2, private el: ElementRef) {
  //   this.login_form = this.fb.group({
  //     username: ['', Validators.required],
  //     password: ['', Validators.required],
  //   });
  //   this.recuperar_form = new FormGroup({
  //     username_recuperar: new FormControl('', Validators.required),
  //     email: new FormControl('', Validators.required),
  //   });
  // };
  // cambioLoginREcuperar = false;
  // iniciarSesion() {
  //   const cajaTraseraLogin = document.querySelector('.cajaTraseraLogin');
  //   const cajaTraseraRecuperar = document.querySelector('.cajaTraseraRecuperar');
  //   const contenedorLoginRecuperar = document.querySelector('.contenedorLoginRecuperar');
  //   const formularioLogin = document.querySelector('.formularioLogin');
  //   const formularioRecuperar = document.querySelector('.formularioRecuperar');
  //   const btnIniciarSesion = document.querySelector('.btnIniciarSesion');
  //   if (this.cambioLoginREcuperar) {
  //     this.cambioLoginREcuperar = false;
  //     formularioRecuperar?.setAttribute('style', 'display:none');
  //     contenedorLoginRecuperar?.setAttribute('style', 'left:10px');
  //     formularioLogin?.setAttribute('style', 'display:block');
  //     cajaTraseraRecuperar?.setAttribute('style', 'opacity:1');
  //     cajaTraseraLogin?.setAttribute('style', 'opacity:0');
  //     btnIniciarSesion?.setAttribute('style', 'display:none');
  //   } else {
  //     this.cambioLoginREcuperar = true;
  //     formularioRecuperar?.setAttribute('style', 'display:none');
  //     contenedorLoginRecuperar?.removeAttribute('style');
  //     formularioLogin?.setAttribute('style', 'display:none');
  //     cajaTraseraRecuperar?.removeAttribute('style');
  //     cajaTraseraLogin?.removeAttribute('style');
  //   }
  // }
  // recuperar() {
  //   this.titulo = 'Recuperar contraseña';
  //   const cajaTraseraLogin = document.querySelector('.cajaTraseraLogin');
  //   const cajaTraseraRecuperar = document.querySelector('.cajaTraseraRecuperar');
  //   const contenedorLoginRecuperar = document.querySelector('.contenedorLoginRecuperar');
  //   const formularioLogin = document.querySelector('.formularioLogin');
  //   const formularioRecuperar = document.querySelector('.formularioRecuperar');
  //   if (this.cambioLoginREcuperar) {
  //     this.cambioLoginREcuperar = false;
  //     formularioRecuperar?.setAttribute('style', 'display:block');
  //     contenedorLoginRecuperar?.setAttribute('style', 'left:410px');
  //     formularioLogin?.setAttribute('style', 'display:block');
  //     cajaTraseraRecuperar?.setAttribute('style', 'opacity:0');
  //     cajaTraseraLogin?.setAttribute('style', 'opacity:1');
  //   } else {
  //     this.cambioLoginREcuperar = true;
  //     formularioRecuperar?.removeAttribute('style');
  //     contenedorLoginRecuperar?.removeAttribute('style');
  //     formularioLogin?.removeAttribute('style');
  //     cajaTraseraRecuperar?.removeAttribute('style');
  //     cajaTraseraLogin?.removeAttribute('style');
  //     cajaTraseraLogin?.removeAttribute('style');
  //   }
  // }
  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background', 'linear-gradient(to right, #d7d2cc 0%, #304352 100%)')
  }
  collapsed = false;
}