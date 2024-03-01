import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, share, tap, throwError } from 'rxjs';
import { Provider, ReqResponse } from 'src/app/core/main.type';
import { environment } from 'src/app/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });
<<<<<<< HEAD
  constructor(private httpClient: HttpClient) { }
=======
  constructor(private _httpClient: HttpClient) { }

>>>>>>> fb630f9d8d8d0d491c4b93720e5c3eec67600be2
  //este metodo nos sirve para obtener los proveedores
  getAllProviders(page: number, size: number): Observable<ReqResponse<Provider[]>> {
    const params = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
<<<<<<< HEAD
    return this.httpClient.get<ReqResponse<Provider[]>>(`${environment.api}/proveedores?page=${page}&size=${size}`)
    .pipe(
      tap(console.log)
    )
=======
    return this._httpClient.get<ReqResponse<Provider[]>>(`${environment.api}/proveedores?page=${page}&size=${size}`)
    // .pipe(
    //   tap(data => console.log('proveedores cargados con exito', data)),
    //   map(res => res.data),
    //   share()
    // )
>>>>>>> fb630f9d8d8d0d491c4b93720e5c3eec67600be2
  }
  //este metodo sirve para registrar un empleado
  saveProvider(provider: Provider): Observable<Provider> {
    return this._httpClient.post<any>(`${environment.api}/proveedor`, provider, { headers: this.httpHeaders })
      .pipe(
        tap(response => console.log('Proveedor guardado:', response)),
        map(response => {
          if (response && response.success) {
            return response.data as Provider
          } else {
            const errorMessage = response && response.message ? response.message : 'Error al guardar el proveedor';
            throw new Error(errorMessage)
          }
        }),
        catchError(err => {
          console.log('Error en la solicitud', err)
          return throwError(err);
        })
      );
  }
  eliminarProvider(id: number): Observable<any> {
    return this._httpClient.delete<any>(`${environment.api}/proveedor/${id}`)
  }
}
