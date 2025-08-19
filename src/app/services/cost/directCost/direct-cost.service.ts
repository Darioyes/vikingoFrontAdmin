import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@enviroments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class DirectCostService {

  #url = environment.domain;
  #http = inject(HttpClient);
  #cookieService = inject(CookieService);

  //? costos directos

  getDirectCosts(): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.get<any>(`${this.#url}directcosts`, {headers: headers});
  }

  searchDirectCosts(term: string): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.get<any>(`${this.#url}searchdirectcosts/${term}`, {headers: headers});
  }

  //?categorias de costos directos

  getCategoriesDirectCosts(): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.get<any>(`${this.#url}categoriesdirectcosts`, {headers: headers});
  }

  searchCategoriesDirectCosts(term: string): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.get<any>(`${this.#url}searchcategoriesdirectcosts/${term}`, {headers: headers});
  }

  postCategoriesDirectCostsNew(data: any): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.post<any>(`${this.#url}categoriesdirectcosts`, data, {headers: headers});
  }

}
