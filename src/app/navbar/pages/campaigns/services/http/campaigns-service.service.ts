import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Observable, tap, map, catchError, throwError } from 'rxjs';
import { Campaign, Pageable } from 'src/app/core/main.type';
// import { Campaign, ReqResponse } from 'src/app/core/main.type';
@Injectable({
  providedIn: 'root'
})
export class CampaignsServiceService {

  private httpHeaders = new HttpHeaders({ 'Conten-type ': 'application/json' });

  constructor(private readonly _http: HttpClient) { }

  getAllCampaings(page: number, size: number): Observable<Pageable<Campaign>> {
    const params = new HttpParams()
      .append('page', page)
      .append('size', size);

    return this._http.get<Pageable<Campaign>>(`${environment.api}/campañas`, { params })
      .pipe(
        tap(data => console.log('Campañas cargadas con éxito!', data)),
      );
  };

  createUser(campaign: Campaign): Observable<Campaign> {
    return this._http.post<Campaign>(`${environment.api}/campañas`, campaign, { headers: this.httpHeaders })
      .pipe(
        tap(data => console.log('Campaña creada con éxito!', data)),
        catchError(error => {
          console.error('Error al crear campaña', error);
          throw error;
        })
      );
  };

  deleteCampaign(campaignId: number): Observable<Campaign> {
    return this._http.delete<Campaign>(`${environment.api}/campañas/${campaignId}`)
      .pipe(
        tap(data => console.log('Campaña eliminada con éxito!', data)),
        catchError(error => {
          console.log('Error al eliminar la campaña', error);
          return throwError(error);
        })
      );
  };

  getCampaignById(campaignId: number): Observable<Campaign> {
    const params = new HttpParams().append('id', campaignId)
    return this._http.get<Campaign>(`${environment.api}/campañas`, { params })
    .pipe(tap(response => console.log('tap', response)))
  }
}