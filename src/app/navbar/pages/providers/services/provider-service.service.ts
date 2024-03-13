import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, share, tap, throwError } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Provider } from '../core/models/main.model';
import { Pageable } from 'src/app/core/main.type';
@Injectable({
  providedIn: 'root'
})
export class ProviderService {

    constructor(private _httpClient: HttpClient) { }
   getAllProviders(page:number, size:number): Observable<Pageable<Provider>> {
    const params = new HttpParams()
    .append('page', page)
    .append('size', size);
    return this._httpClient.get<Pageable<Provider>>(`${environment.api}/proveedores`)
    .pipe(
      tap(data => console.log('Proveedores cargados con éxito!', data)),
      catchError(error => {
        console.error('Error al crear usuario', error);
        throw error;
      }) 
    )
   }
 
}
