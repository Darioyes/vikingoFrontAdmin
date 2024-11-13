import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@enviroments/environment.development';
import { ApiMaintenanceResponse } from '@interfaces/maintenances/IGeneralMtto.interface';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class MaintenanceProgressService {

  #url = environment.domain;
  #http = inject(HttpClient);
  #cookieService = inject(CookieService);


  searchProgressMaintenance(days:number): Observable<ApiMaintenanceResponse>{
    const token = this.#cookieService.get('token');
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    return this.#http.get<ApiMaintenanceResponse>(`${this.#url}progressmaintenance/${days}`, {headers: headers});
  }

}
