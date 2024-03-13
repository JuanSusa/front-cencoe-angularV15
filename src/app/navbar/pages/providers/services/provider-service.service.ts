import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable, catchError, map, share, tap, throwError } from 'rxjs';
import { ReqResponse } from 'src/app/core/main.type';
// import { Provider, ReqResponse } from 'src/app/core/main.type';
import { environment } from 'src/app/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(private _httpClient: HttpClient) { }
 
 
}
