import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Observable, tap, map } from 'rxjs';
import { ReqResponse, Team } from 'src/app/core/main.type';


@Injectable({
  providedIn: 'root'
})
export class GroupServiceService {

  constructor(private readonly http: HttpClient) { }

  getAllGroups(): Observable<Team[]>{
    return this.http.get<ReqResponse<Team>>(`${environment.api}/grupos`)
    .pipe(
      tap(data => console.log('Grupos cargados con exito', data)),
      map(res => res.data)
    )
  }
}
