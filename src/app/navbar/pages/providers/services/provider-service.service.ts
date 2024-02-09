import { HttpClient } from '@angular/common/http';
import { EnvironmentInjector, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Provider } from 'src/app/core/main.type';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProviderServiceService {

  constructor(private _httpClient: HttpClient) { }  //injectamos una variable llamada httpClient de tipo httpClient


  getAllProviders(): Observable<Provider[]>{     //devuelve un array de proveedores
     return this._httpClient.get<Provider[]>(`${environment.api}/proveedores`)
  }

  getProvider(id: number): Observable<Provider>{ //devuelve un solo proveedor por id
    return this._httpClient.get<Provider>(environment.api+'/proveedor/' +id)

  }
}
