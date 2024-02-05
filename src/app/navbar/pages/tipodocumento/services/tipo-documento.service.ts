import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeDocs } from 'src/app/core/main.type';
import { environment } from 'src/app/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TipodocumentoService {
    
    constructor(private _http: HttpClient) { }

    public getAllTypeDocuments(): Observable<TypeDocs>{
        return this._http.get<TypeDocs>(`${environment.api}/tipos-documento`)
    }
    
}