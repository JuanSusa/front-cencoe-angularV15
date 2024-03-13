import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login, LoginResponse } from 'src/app/core/main.type';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('errorState', [
      state('show', style({
        opacity: 1,
        backgroundColor: 'rgba(128, 0, 0, 0.8)',
        border: '1px solid rgba(64, 0, 0, 0.8)',
        borderRadius: '5px',
        color: 'white',
        padding: '8px',
        marginTop: '0',
        marginBottom: '0'
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', [
        animate('0.3s')
      ]),
      transition('hide => show', [
        animate('0.3s')
      ]),
    ])
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  messageError: string='';
  showError = false;
  constructor(private fb: FormBuilder, private renderer: Renderer2, private el: ElementRef, private authService: AuthServiceService, private router: Router){
    this.loginForm = this.fb.group({
      userNumDoc: ['', Validators.required],
      userPassword: ['', Validators.required]
    });
  };
  cambioL_R: boolean = false;
  logIn() {
    const login: Login = this.loginForm.value;
      this.authService.login(login).subscribe((res:LoginResponse) => {
        console.log(res)
        if (res.success){
          localStorage.setItem('token', res.data)
          this.router.navigate(['/campañas'])
        }else{
          this.messageError = res.message
          this.showError = true;
        }
      },
      error => {
        this.messageError = "Usuario o contraseña incorrectos"
        this.showError = true;
      }
      )

      
    // const _cambio_L_R = document.querySelector('.contenedorLogin') as HTMLElement;
    // const _formulario_L = document.querySelector('.formularioLogin') as HTMLElement;
    // const _caja_T_L = document.querySelector('.cajaTraseraLogin') as HTMLElement;
    // const _caja_T_R = document.querySelector('.cajaTraseraRecuperar') as HTMLElement;
    // const _messageError = document.querySelector('.mat-mdc-form-field-error') as HTMLElement;
    // this.cambioL_R = !this.cambioL_R;
    // _formulario_L.style.display = this.cambioL_R ? 'none' : 'block';
    // _cambio_L_R.classList.toggle('cambio', this.cambioL_R);
    // _cambio_L_R.style.left = this.cambioL_R ? '360px' : '0';
    // _caja_T_L.style.opacity = this.cambioL_R ? '1' : '0';
    // _caja_T_R.style.opacity = this.cambioL_R ? '0' : '1';
    // _messageError.style.display = this.cambioL_R ? 'none' : 'block';
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
