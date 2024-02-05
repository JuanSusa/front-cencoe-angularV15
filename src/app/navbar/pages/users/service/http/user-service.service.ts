import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/main.type';
import { environment } from 'src/app/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class userHttpService {
    constructor(private readonly _htt: HttpClient) { }

    getAllUsers(): Observable<User[]>{
        return this._htt.get<User[]>(`${environment.api}/usuarios`)
    }
    
}