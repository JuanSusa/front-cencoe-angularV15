import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
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
                map(res => res.data)
            )
    }

    // getAllUsers(): Observable<User[]> {
    //     return this._http.get<ReqResponse>(`${environment.api}/usuarios`)
    //       .pipe(
    //         tap(data => console.log('Usuários carregados com sucesso!', data)),
    //         map(res => res.data)
    //       )
    //   }

}