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

  cambioL_R: boolean = false;

  logIn() {
    const _cambio_L_R = document.querySelector('.contenedorLoginRecuperar') as HTMLElement;
    const _formulario_L = document.querySelector('.formularioLogin') as HTMLElement;
    const _formulario_R = document.querySelector('.formularioRecuperar') as HTMLElement;
    const _caja_T_L = document.querySelector('.cajaTraseraLogin') as HTMLElement;
    const _caja_T_R = document.querySelector('.cajaTraseraRecuperar') as HTMLElement;

    const _messageError = document.querySelector('.mat-mdc-form-field-error') as HTMLElement;

    this.cambioL_R = !this.cambioL_R;
    _formulario_L.style.display = this.cambioL_R ? 'none' : 'block';
    _formulario_R.style.display = this.cambioL_R ? 'block' : 'none';

    _cambio_L_R.classList.toggle('cambio', this.cambioL_R);
    _cambio_L_R.style.left = this.cambioL_R ? '360px' : '10px';
    _caja_T_L.style.opacity = this.cambioL_R ? '1' : '0';
    _caja_T_R.style.opacity = this.cambioL_R ? '0' : '1';

    _messageError.style.display = this.cambioL_R ? 'none' : 'block';
  }

  recovery() {
    const _cambio_L_R = document.querySelector('.contenedorLoginRecuperar') as HTMLElement;
    const _formulario_L = document.querySelector('.formularioLogin') as HTMLElement;
    const _formulario_R = document.querySelector('.formularioRecuperar') as HTMLElement;
    const _caja_T_L = document.querySelector('.cajaTraseraLogin') as HTMLElement;
    const _caja_T_R = document.querySelector('.cajaTraseraRecuperar') as HTMLElement;

    this.cambioL_R = !this.cambioL_R;
    _formulario_L.style.display = this.cambioL_R ? 'none' : 'block';
    _formulario_R.style.display = this.cambioL_R ? 'block' : 'none';

    _cambio_L_R.classList.toggle('cambio', this.cambioL_R)
    _cambio_L_R.style.left = this.cambioL_R ? '360px' : '10px';
    _caja_T_R.style.opacity = this.cambioL_R ? '0' : '1';
    _caja_T_L.style.opacity = this.cambioL_R ? '1' : '0';
  }

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background', 'linear-gradient(to right, #d7d2cc 0%, #304352 100%)')
  }
  collapsed = false;
}