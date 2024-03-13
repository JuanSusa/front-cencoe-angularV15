import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap, map, share, catchError, throwError } from 'rxjs';
// import { Customer, ReqResponse } from 'src/app/core/main.type';
import { environment } from 'src/app/environments/environment';
import { Pageable } from 'src/app/core/main.type';
import { Customer } from '../../core/models/main.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {


  constructor(private readonly _http: HttpClient) { }

  getAllCustomers(page: number, size: number): Observable<Pageable<Customer>> {
    const params = new HttpParams()
      .append('page', page)
      .append('size', size);
    return this._http.get<Pageable<Customer>>(`${environment.api}/clientes`)
      .pipe(
        tap(data => console.log('Clientes cargados con éxito!', data)),
      );
  };

  deleteCustomer(customerId: number): Observable<Customer> {
    return this._http.delete<Customer>(`${environment.api}/clientes/${customerId}`)
      .pipe(
        tap(data => console.log('Cliente eliminado conéxito!', data)),
        catchError(error => {
          console.error('Error al eliminar cliente', error);
          return throwError(error);
        })
      );
  };

  getCustomerById(customerId: number): Observable<Customer> {
    const params = new HttpParams().append('id', customerId)
    return this._http.get<Customer>(`${environment.api}/clientes`)
    .pipe(tap(response => console.log(`tap`, response)))
  };
}