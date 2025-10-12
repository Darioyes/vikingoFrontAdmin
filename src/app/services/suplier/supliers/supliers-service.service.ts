import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@enviroments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class SupliersServiceService {

  #url = environment.domain;
  #http = inject(HttpClient);
  #cookieService = inject(CookieService);

  getSupliers(): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
      return this.#http.get(`${this.#url}suppliers`, {headers: headers});
  };

  getSupplier(id:number): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.#http.get(`${this.#url}suppliers/${id}`, {headers: headers});
  }

  modifySupplier(id:number, data:any): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.#http.post(`${this.#url}suppliers/${id}`, data, {headers: headers});
  }

  newSupplier(data:any): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.#http.post(`${this.#url}suppliers`, data, {headers: headers});
  }

  deleteSupplier(id:number): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'authorization': `Bearer ${token}`
    });
    return this.#http.delete(`${this.#url}suppliers/${id}`, {headers: headers});
  }

  getSearchSupliers(search:string): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.#http.get(`${this.#url}searchsuppliers/${search}`, {headers: headers});
  }

  getInfoBasicSuppliers(): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.#http.get(`${this.#url}basicsuppliers`, {headers: headers});
  }

  getAllSuppliersNoPaginate(): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.#http.get<any>(`${this.#url}totalsuppliers`, {headers: headers});
  }

}
