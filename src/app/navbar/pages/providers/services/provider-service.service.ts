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

  constructor(private _httpClient: HttpClient) { }
  //este metodo nos sirve para obtener los proveedores
  getAllProviders(page: number, size: number): Observable<ReqResponse<Provider[]>> {
    const params = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())

    return this._httpClient.get<ReqResponse<Provider[]>>(`${environment.api}/proveedores?page=${page}&size=${size}`)
    .pipe(
      tap(console.log)
    )
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
