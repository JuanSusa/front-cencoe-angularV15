import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { ReqResponse, User } from 'src/app/core/main.type';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class userHttpService {

  constructor(private readonly _http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this._http.get<ReqResponse>(`${environment.api}/usuarios`)
      .pipe(
        tap(data => console.log('Usuários carregados com sucesso!', data)),
        map(res => res.data)
      )
  }




}
