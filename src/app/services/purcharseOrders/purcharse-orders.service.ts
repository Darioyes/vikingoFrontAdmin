import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@enviroments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurcharseOrdersService {

  #url = environment.domain;
  #http = inject(HttpClient);
  #cookieService = inject(CookieService);

  newPurecharseOrder(data: any): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.post<any>(`${this.#url}purchaseorders`, data, {headers: headers});
  }
  
  getPurcharseOrders() : Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return this.#http.get<any>(`${this.#url}purchaseorders`, { headers });
  }
  getPurcharseOrder(id: number) : Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.#http.get<any>(`${this.#url}purchaseorders/${id}`, { headers });
  }

  modifyPurcharseOrder(id: number, data: any): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.post<any>(`${this.#url}purchaseorders/${id}`, data, {headers: headers});
  }

  deletePurcharseOrder(id: number): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.delete<any>(`${this.#url}purchaseorders/${id}`, {headers: headers});
  }

  searchPurchaseOrders(term: string): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.get<any>(`${this.#url}searchpurchaseorders/${term}`, {headers: headers});
  }


}
