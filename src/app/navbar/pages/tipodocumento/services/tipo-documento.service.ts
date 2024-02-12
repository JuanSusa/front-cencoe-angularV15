import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, share, tap, throwError } from 'rxjs';
import { ReqResponse, TypeDocs } from 'src/app/core/main.type';
import { environment } from 'src/app/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TipodocumentoHttpService {

    constructor(private _http: HttpClient) { }

    getAllTypeDocuments(): Observable<TypeDocs[]> {
        return this._http.get<ReqResponse>(`${environment.api}/tipos-documento`)
            .pipe(
                tap(data => console.log('TIPO DOCUMENTOS', data)),
                map(res => res.data),
                share()
            )
    }

   saveTypeDocument(typeDocs: TypeDocs): Observable<TypeDocs>  {
    return this._http.post<TypeDocs>(`${environment.api}/tipo-documento`, typeDocs)
    .pipe(
        tap(data => console.log('DATAAA', data)),
        map((dataResponse: any) => dataResponse.typeDocs as TypeDocs),
        catchError((e) => {
            if(e.success){
                return throwError(e);
            }
            if (e.error.mensaje) {
                console.error(e.error.mensaje);
              }
              return throwError(e);
        }),
    )
   }

}