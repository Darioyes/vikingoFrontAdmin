import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@enviroments/environment.development';
import { ApiResponse } from '@interfaces/response/IGeneralResponse';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class SummaryService {

  #url = environment.domain;
  #http = inject(HttpClient);
  #cookieService = inject(CookieService);



  searchBasicInfo(days:number): Observable<ApiResponse>{
    const token = this.#cookieService.get('token');
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    });


    return this.#http.get<ApiResponse>(`${this.#url}summary/${days}`, {headers: headers});
  }

}
