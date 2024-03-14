import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor() {}
 
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    const newCloneRequest = request.clone({ // Clonamos la petición
      setHeaders:{
       'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }

     })
    debugger;
    return next.handle(newCloneRequest);
  }
}
