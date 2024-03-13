import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Observable, tap, map, catchError, throwError } from 'rxjs';
import { Pageable } from 'src/app/core/main.type';
import { Team } from '../../core/models/main.models';
// import { ReqResponse, Team } from 'src/app/core/main.type';
@Injectable({
  providedIn: 'root'
})
export class GroupServiceService {

  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' })

  constructor(private readonly _http: HttpClient) { }

  getAllTeams(page: number, size: number): Observable<Pageable<Team>> {
    const params = new HttpParams()
      .append('page', page)
      .append('size', size);

    return this._http.get<Pageable<Team>>(`${environment.api}/grupos`, { params })
      .pipe(
        tap(data => console.log('Grupos cargados con éxito!', data)),
      );
  };

  createTeam(team: Team): Observable<Team> {
    return this._http.post<Team>(`${environment.api}/grupos`, team, { headers: this.httpHeaders })
      .pipe(
        tap(data => console.log('Grupo creado con éxito!', data)),
        catchError(error => {
          console.error('Error al crear grupo', error);
          throw error;
        })
      );
  };

  deleteTeam(teamId: number): Observable<Team> {
    return this._http.delete<Team>(`${environment.api}/grupos/${teamId}`)
      .pipe(
        tap(data => console.log('Grupo eliminado con éxito!', data)),
        catchError(error => {
          console.log('Error al eliminar grupo', error);
          return throwError(error);
        })
      );
  };

  getTeamById(teamId: number): Observable<Team> {
    const params = new HttpParams().append('id', teamId)
    return this._http.get<Team>(`${environment.api}/grupos`, { params })
      .pipe(tap(response => console.log('tap', response)))
  }
}
