import { HttpClient, HttpParams } from '@angular/common/http';
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

    getTypeDocsById(typeDocId: number): Observable<TypeDocs> {
        const params = new HttpParams().append('tipodoc', typeDocId)
        return this._http.get<TypeDocs>(`${environment.api}/tipo-documento/id`, { params })
            .pipe(
                tap(console.log)
            )
    }

    saveTypeDocument(typeDocs: TypeDocs): Observable<TypeDocs> {
        return this._http.post<any>(`${environment.api}/tipo-documento`, typeDocs)
            .pipe(
                tap(response => console.log('Respuesta del servidor en el metodo Save', response)),
                map(response => {
                    if (response && response.success) {
                        return response.data as TypeDocs;
                    } else {
                        const errorMessage = response && response.message ? response.message : 'Error al guardar el tipo de documento';
                        throw new Error(errorMessage)
                    }
                }),
                catchError(err => {
                    console.log('Error en la solicitud', err)
                    return throwError(err);
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