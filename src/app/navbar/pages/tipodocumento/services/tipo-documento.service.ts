import { Pageable } from './../../../../core/main.type';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, share, tap, throwError } from 'rxjs';
import { ReqResponse } from 'src/app/core/main.type';
import { environment } from 'src/app/environments/environment';
import { TypeDocs } from '../core/models/main.model';

@Injectable({
    providedIn: 'root'
})
export class TipodocumentoHttpService {

    private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

    constructor(private _http: HttpClient) { }

    getAllTypeDocuments(): Observable<TypeDocs[]> {
        return this._http.get<ReqResponse<TypeDocs>>(`${environment.api}/tipos-documento`)
            .pipe(
                // tap(data => console.log('TIPO DOCUMENTOS', data)), 
                map(res => res.data),
                share()
            )
    }

    // getTypeDocsById(typeDocId: number): Observable<TypeDocs> {
    //     const params = new HttpParams().append('tipodoc', typeDocId)
    //     return this._http.get<TypeDocs>(`${environment.api}/tipo-documento/id`, { params })
    //         .pipe(
    //             tap(console.log)
    //         )
    // }

    saveTypeDocument(typeDocs: TypeDocs): Observable<TypeDocs> {
        return this._http.post<any>(`${environment.api}/tipo-documento`, typeDocs, { headers: this.httpHeaders })
            .pipe(
                tap(response => console.log('Respuesta del servidor en el metodo Save', response)),
                map(response => response.data as TypeDocs),

                catchError(err => {
                    return throwError(() => {
                        console.error('Error en la solicitud');
                        return err;
                    })
                })
            );
    }

    deleteTypeDoc(typeDocId: number): Observable<TypeDocs> {
        return this._http.delete<TypeDocs>(`${environment.api}/tipo-documento/${typeDocId}`)
            .pipe(
                catchError((error) => {
                    console.error('Error al eliminar tipo de documento', error);
                    return throwError('Ocurrió un error al eliminar el tipo de documento');
                })
            );
    }

}