import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
// import { ReqResponse, User } from 'src/app/core/main.type';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class userHttpService {

  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(private readonly _http: HttpClient) { }

  // getAllUsers(): Observable<User[]> {
  //   return this._http.get<ReqResponse<User>>(`${environment.api}/usuarios`)
  //     .pipe(
  //       tap(data => console.log('Usuários carregados com sucesso!', data)),
  //       map(res => res.data)
  //     )
  //     }

  // getUserById(userId: number): Observable<User> {
  //   // const params = new HttpParams().append('userId', userId)
  //   return this._http.get<User>(`${environment.api}/usuario/${userId}`)
  //     .pipe(tap(response => console.log('tap', response)))
  // }

  // saveUser(user: User): Observable<User> {
  //   return this._http.post<any>(`${environment.api}/usuario`, user, { headers: this.httpHeaders })
  //     .pipe(
  //       tap(response => console.log('Respuesta del servidor en el metodo Save', response)),
  //       map(response => {
  //         if (response && response.success) {
  //           return response.data as User;
  //         } else {
  //           const errorMessage = response && response.message ? response.message : 'Error al guardar el tipo de documento';
  //           throw new Error(errorMessage)
  //         }
  //       }),
  //       catchError(err => {
  //         console.log('Error en la solicitud', err)
  //         return throwError(err);
  //       })
  //     );
  // }
}