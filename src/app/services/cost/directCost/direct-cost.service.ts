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

  createDirectCost(data: any): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.post<any>(`${this.#url}directcosts`, data, {headers: headers});
  }

  getDirectCosts(): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.get<any>(`${this.#url}directcosts`, {headers: headers});
  }

  getDirectCost(id: number): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.get<any>(`${this.#url}directcosts/${id}`, {headers: headers});
  }

  modififyDirectCost(id: number, data: any): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.post<any>(`${this.#url}directcosts/${id}`, data, {headers: headers});
  }

  deleteDirectCost(id: number): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.delete<any>(`${this.#url}directcosts/${id}`, {headers: headers});
  }

  searchDirectCosts(term: string): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.get<any>(`${this.#url}searchdirectcosts/${term}`, {headers: headers});
  }

  getSumaryDirectCosts(): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.get<any>(`${this.#url}sumarydirectcosts`, {headers: headers});  
  }

  //!categorias de costos directos

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

  getCategoryDirectCost(id: number): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.get<any>(`${this.#url}categoriesdirectcosts/${id}`, {headers: headers});
  }

  modifyCategoryDirectCost(id: number, data: any): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.post<any>(`${this.#url}categoriesdirectcosts/${id}`, data, {headers: headers});
  }
  
  deleteCategoryDirectCost(id: number): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.delete<any>(`${this.#url}categoriesdirectcosts/${id}`, {headers: headers});
  }

  getAllCategoriesDirectCosts(): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.get<any>(`${this.#url}categoriesdirect/total`, {headers: headers});
  }
}
