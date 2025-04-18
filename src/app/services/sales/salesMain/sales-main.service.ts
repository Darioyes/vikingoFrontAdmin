import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@enviroments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class SalesMainService {

  #url = environment.domain;
  #http = inject(HttpClient);
  #cookieService = inject(CookieService);

  getSales(): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
      return this.#http.get(`${this.#url}sales`, {headers: headers});
  };

  getSearchSales(search: string): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.#http.get(`${this.#url}searchsales/${search}`, {headers: headers});
  }

  getSumarySales(day:number): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.#http.get(`${this.#url}sumarysales/${day}`, {headers: headers});
  }

}
