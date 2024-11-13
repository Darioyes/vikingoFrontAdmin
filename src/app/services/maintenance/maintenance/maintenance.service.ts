import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@enviroments/environment.development';
import { ApiMaintenanceDetalleResponse } from '@interfaces/maintenances/IGeneralDetallleMtto.interface';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class MaintenanceService {

  #url = environment.domain;
  #http = inject(HttpClient);
  #cookieService = inject(CookieService);


  getmaintenances(): Observable<ApiMaintenanceDetalleResponse>{
    const token = this.#cookieService.get('token');
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    return this.#http.get<ApiMaintenanceDetalleResponse>(`${this.#url}maintenances`, {headers: headers});
  }

  getPaginator(url:string): Observable<ApiMaintenanceDetalleResponse>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return this.#http.get<ApiMaintenanceDetalleResponse>(url, {headers: headers});
  }

  searchMaintenance(search: string): Observable<ApiMaintenanceDetalleResponse>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return this.#http.get<ApiMaintenanceDetalleResponse>(`${this.#url}searchmaintenance/${search}`, {headers: headers});
  }
}
