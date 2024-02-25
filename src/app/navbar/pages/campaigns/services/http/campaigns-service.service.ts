import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Observable, tap, map } from 'rxjs';
import { Campaign, ReqResponse } from 'src/app/core/main.type';

@Injectable({
  providedIn: 'root'
})
export class CampaignsServiceService {
  constructor(private readonly http: HttpClient) { }

  getAllCampaigns(): Observable<Campaign[]>{
  return this.http.get<ReqResponse<Campaign>>(`${environment.api}/campañas`)
  .pipe(
    tap(data => console.log('Campañas cargados con exito', data)),
    map(res => res.data)
  )
}
}
