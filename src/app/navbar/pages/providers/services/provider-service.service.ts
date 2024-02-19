import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, catchError, map, share, tap, throwError } from 'rxjs';
import { Provider, ReqResponse } from 'src/app/core/main.type';
import { environment } from 'src/app/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProviderServiceService {

  constructor(
    private httpClient: HttpClient,


  ) { }  //injectamos una variable llamada httpClient de tipo httpClient


  //este metodo nos sirve para obtener los proveedores
  getAllProviders(): Observable<Provider[]> {
    return this.httpClient.get<ReqResponse>(`${environment.api}/proveedores`)
      .pipe(
        tap(data => console.log('proveedores cargados con exito', data)),
        map(res => res.data),
        share()
      )
  }

  //este metodo sirve para registrar un empleado
  saveProvider(provider: Provider): Observable<Provider> {
    return this.httpClient.post<Provider>(`${environment.api}/providers`, provider)
      .pipe(
        tap(data => console.log('Proveedor guardado:', data)),
        catchError((error) => {
          if (error.error && error.error.message) {
            console.error('Error al guardar proveedor:', error.error.message);
          } else {
            console.error('Error al guardar proveedor:', error);
          }
          return throwError(error);
        })
      );
  }
  eliminarProvider(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${environment.api}/proveedor/${id}`)
  }

}




// getProvider(id: number): Observable<Provider>{ //devuelve un solo proveedor por id
//   return this.httpClient.get<Provider>(environment.api+'/proveedor/' +id)

// }



