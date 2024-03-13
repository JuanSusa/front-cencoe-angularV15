import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, share, tap, throwError } from 'rxjs';
import { Pageable } from 'src/app/core/main.type';
import { Provider } from '../core/models/main.model';
import { environment } from 'src/app/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(private _http: HttpClient) { }

  //este metodo nos sirve para obtener los proveedores
  getAllProviders(page: number, size: number): Observable<Pageable<Provider>> {
    const params = new HttpParams()
      .append('page', page)
      .append('size', size);

    return this._http.get<Pageable<Provider>>(`${environment.api}/proveedor`, { params })
      .pipe(
        tap(data => console.log('Proveedores cargados con éxito!', data))
      );
  };

  createProvider(provider: Provider): Observable<Provider> {
    return this._http.post<Provider>(`${environment.api}/proveedor`, provider, { headers: this.httpHeaders})
    .pipe(
      tap(data => console.log('Proveedores cargados con éxito!', data)),
      catchError(error => {
        console.error('Error al cargar proveedor', error);
        throw error;
      })
    );
  };

  deleteProvider(providerId: number): Observable<Provider> {
    return this._http.delete<Provider>(`${environment.api}/proveedor/${providerId}`)
    .pipe(
      tap(data => console.log('Proveedor eliminado con éxito!', data)),
      catchError(error => {
        console.error('Error al eliminar proveedor', error);
        return throwError(error);
      })
    );
  };

  getProviderById(providerId: number): Observable<Provider> {
    const params = new HttpParams().append('id', providerId)
    return this._http.get<Provider>(`${environment.api}/proveedor`, { params })
    .pipe(tap(response => console.log('tap', response)))
  }

  //este metodo sirve para registrar un empleado
  // saveProvider(provider: Provider): Observable<Provider> {
  //   return this._httpClient.post<Provider>(`${environment.api}/provider`, provider)
  //     .pipe(
  //       tap(response => console.log('Proveedor guardado:', response)),
  //       // map(response => {
  //       //   if (response && response.success) {
  //       //     return response.data as Provider
  //       //   } else {
  //       //     const errorMessage = response && response.message ? response.message : 'Error al guardar el proveedor';
  //       //     throw new Error(errorMessage)
  //       //   }
  //       // }),
  //       catchError(err => {
  //         console.log('Error en la solicitud', err)
  //         return throwError(err);
  //       })
  //     );
  // }
  // eliminarProvider(id: number): Observable<any> {
  //   return this._httpClient.delete<any>(`${environment.api}/proveedor/${id}`)
  // }
}
