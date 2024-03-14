import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { DecodedToken, Login, LoginResponse } from 'src/app/core/main.type';
import { environment } from 'src/app/environments/environment';
import { jwtDecode } from "jwt-decode";
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loggedInUserSubject :  BehaviorSubject<string> = new BehaviorSubject<string>('');
  loggedInUserId = this.loggedInUserSubject.asObservable(); 

  get isLoggedIn() { return this.loggedIn.asObservable(); }

  constructor(private router: Router,  private http: HttpClient, private jwtHelper: JwtHelperService) {} 
  user: DecodedToken | undefined;
   login(login: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.api}/login`, login).pipe(
      tap((res:LoginResponse) => {
        if (res.success){
          localStorage.setItem('token', res.data)

          // let decodedToken = jwtDecode(res.data) as DecodedToken;
          // localStorage.setItem('user', JSON.stringify(decodedToken))
        
        } 
      })
    );
    }
    isAuthenticated(): boolean {
      const token = localStorage.getItem('token');
      // Comprueba si existe un token
      if (token) {
        return true;
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Necesitas autenticarte para acceder a esta página!',
              confirmButtonColor: '#ff5e6c'
          });
        this.router.navigate(['/login']);
        return false;
      }
    }
    logout(): void {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
    checkToken(): void {
      const token = localStorage.getItem('token');
  
      if (this.jwtHelper.isTokenExpired(token)) {
        this.router.navigate(['/login']);
        Swal.fire('Sesión expirada', 'Por favor, inicia sesión de nuevo', 'info');
      }
    }
}


