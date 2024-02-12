import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, share, tap } from 'rxjs';
import { Provider, providerR } from 'src/app/core/main.type';
import { environment } from 'src/app/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProviderServiceService {

  constructor(private httpClient: HttpClient) { }  //injectamos una variable llamada httpClient de tipo httpClient

  

  getAllProviders(): Observable<Provider[]>{     //devuelve un array de proveedores 
    return this.httpClient.get<providerR>(`${environment.api}/proveedores`)
    .pipe(
      tap(data => console.log('proveedores cargados con exito', data)),
      map(res => res.data),
      share()
    )

  }


  

  // getProvider(id: number): Observable<Provider>{ //devuelve un solo proveedor por id
  //   return this.httpClient.get<Provider>(environment.api+'/proveedor/' +id)

  // }
}


