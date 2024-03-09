import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Role } from '../core/models/main.model';
import { Pageable, ReqResponse } from 'src/app/core/main.type';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleServiceHttpService {

constructor(
  private _http :  HttpClient
) { }

getAllroles():Observable<Role>{
  return this._http.get<Role>(`${environment.api}/roles`)
  .pipe(
    map(res => res) 
  )
}

}
