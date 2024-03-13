import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
// import { ReqResponse, User } from 'src/app/core/main.type';
import { environment } from 'src/app/environments/environment';
import { User } from '../../core/models/main.model';
import { Pageable } from 'src/app/core/main.type';

@Injectable({
  providedIn: 'root'
})

export class userHttpService {

  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(private readonly _http: HttpClient) { }

  getAllUsers(page: number, size: number): Observable<Pageable<User>> {
    const params = new HttpParams()
      .append('page', page)
      .append('size', size);

    return this._http.get<Pageable<User>>(`${environment.api}/usuarios`, { params })
    .pipe(
      tap(data => console.log('Usuarios cargados con éxito!', data)),
    
    );
  };

  createUser(user: User): Observable<User> {
    console.log(user)
    return this._http.post<User>(`${environment.api}/usuario`, user, { headers: this.httpHeaders })
      .pipe(
        tap(data => console.log('Usuario creado con éxito!', data)),
        catchError(error => {
          console.error('Error al crear usuario', error);
          throw error;
        })
      );
  };

  updateUser(user: User): Observable<User> {
    return this._http.put<User>(`${environment.api}/usuario`, user, { headers: this.httpHeaders })
      .pipe(
        tap(data => console.log('Usuario actualizado con éxito!', data)),
        catchError(error => {
          console.error('Error al actualizar usuario', error);
          return throwError(error);
        })
      );
  };

  deleteUser(userId: number): Observable<User> {
    return this._http.delete<User>(`${environment.api}/usuario/${userId}`)
      .pipe(
        tap(data => console.log('Usuario eliminado con éxito!', data)),
        catchError(error => {
          console.error('Error al eliminar usuario', error);
          return throwError(error);
        })
      );
  };

  getUserById(userId: number): Observable<User> {
    const params = new HttpParams().append('id', userId)
    return this._http.get<User>(`${environment.api}/usuario`, { params })
      .pipe(tap(response => console.log('tap', response)))
  }
}