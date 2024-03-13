import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private renderer: Renderer2, private el: ElementRef) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  };
  cambioL_R: boolean = false;
  logIn() {
    const _cambio_L_R = document.querySelector('.contenedorLogin') as HTMLElement;
    const _formulario_L = document.querySelector('.formularioLogin') as HTMLElement;
    const _caja_T_L = document.querySelector('.cajaTraseraLogin') as HTMLElement;
    const _caja_T_R = document.querySelector('.cajaTraseraRecuperar') as HTMLElement;
    const _messageError = document.querySelector('.mat-mdc-form-field-error') as HTMLElement;
    this.cambioL_R = !this.cambioL_R;
    _formulario_L.style.display = this.cambioL_R ? 'none' : 'block';
    _cambio_L_R.classList.toggle('cambio', this.cambioL_R);
    _cambio_L_R.style.left = this.cambioL_R ? '360px' : '0';
    _caja_T_L.style.opacity = this.cambioL_R ? '1' : '0';
    _caja_T_R.style.opacity = this.cambioL_R ? '0' : '1';
    _messageError.style.display = this.cambioL_R ? 'none' : 'block';
  }
  info() {
    const _cambio_L_R = document.querySelector('.contenedorLogin') as HTMLElement;
    const _formulario_L = document.querySelector('.formularioLogin') as HTMLElement;
    const _caja_T_L = document.querySelector('.cajaTraseraLogin') as HTMLElement;
    const _caja_T_R = document.querySelector('.cajaTraseraRecuperar') as HTMLElement;
    this.cambioL_R = !this.cambioL_R;
    _formulario_L.style.display = this.cambioL_R ? 'block' : 'none';
    _cambio_L_R.classList.toggle('cambio', this.cambioL_R)
    _cambio_L_R.style.left = this.cambioL_R ? '360px' : '0';
    _caja_T_L.style.opacity = this.cambioL_R ? '1' : '0';
    _caja_T_R.style.opacity = this.cambioL_R ? '0' : '1';
  }
  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background', 'linear-gradient(to bottom right, #363636d2, #d6d6d6)')
  }
  collapsed = false;
}
