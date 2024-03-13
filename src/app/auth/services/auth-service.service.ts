import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Login } from 'src/app/core/main.type';
import { environment } from 'src/app/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loggedInUserSubject :  BehaviorSubject<string> = new BehaviorSubject<string>('');
  loggedInUserId = this.loggedInUserSubject.asObservable(); 

  get isLoggedIn() { return this.loggedIn.asObservable(); }

  constructor(private router: Router,  private http: HttpClient) {} 

  login(login: Login){
      this.http.post<any>(`${environment.api}/auth/login`, login).subscribe((res) => {
        const token = res.data;
        this.loggedIn.next(true);
        this.loggedInUserSubject.next(login.username);
        localStorage.setItem('token', token);
        this.router.navigate(['/']);
  },
  (error)=>
  {
    this.loggedIn.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  
  )
}

}