import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map, share } from 'rxjs'; 
import { Customer, ReqResponse } from 'src/app/core/main.type';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  constructor(private readonly _htt: HttpClient) { }

  getAllCustomers(): Observable<Customer[]>{
    return this._htt.get<ReqResponse<Customer>>(`${environment.api}/clientes`)
    .pipe(
      tap(data => console.log('Clientes cargados con exito', data)),
      map(res => res.data)
    )
  }
}

// pipe son opradors que hacen parte de la libreria de rjxs y nos permmite manipular los observables.
// Tap no permite imprimir la información del observable
// Map es un operador de transformador de información, cambiar lo que esta trayendo y mostras lo que yo quiera
// Share nos permite compartir la información del observable en los diferentes modulos