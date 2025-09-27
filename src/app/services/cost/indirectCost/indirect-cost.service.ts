import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@enviroments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class IndirectCostService {

    #url = environment.domain;
    #http = inject(HttpClient);
    #cookieService = inject(CookieService);


    //!costos indirectos

    createIndirectCost(data: any): Observable<any>{
      const token = this.#cookieService.get('token');
      const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      return this.#http.post<any>(`${this.#url}indirectcosts`, data, {headers: headers});
    }

    getIndirectCosts(): Observable<any>{
      const token = this.#cookieService.get('token');
      const headers = {
        'Accept': 'application',
        'Authorization': `Bearer ${token}`
      };
      return this.#http.get<any>(`${this.#url}indirectcosts`, {headers: headers});
    }

    getOneIndirectCost(id: number): Observable<any>{
      const token = this.#cookieService.get('token');
      const headers = {
        'Accept': 'application',
        'Authorization': `Bearer ${token}`
      };
      return this.#http.get<any>(`${this.#url}indirectcosts/${id}`, {headers: headers});
    }
  

    modifyIndirectCostF(id: number, data: any): Observable<any>{
      const token = this.#cookieService.get('token');
      const headers = {
        'Accept': 'application',
        'Authorization': `Bearer ${token}`
      };
      return this.#http.post<any>(`${this.#url}indirectcosts/${id}`, data, {headers: headers});
    }

    deleteIndirectCostF(id: number): Observable<any>{
      const token = this.#cookieService.get('token');
      const headers = {
        'Accept': 'application',
        'Authorization': `Bearer ${token}`
      };
      return this.#http.delete<any>(`${this.#url}indirectcosts/${id}`, {headers: headers});
    }

    searchIndirectCosts(term: string): Observable<any>{
      const token = this.#cookieService.get('token');
      const headers = {
        'Accept': 'application',
        'Authorization': `Bearer ${token}`
      };
      return this.#http.get<any>(`${this.#url}searchindirectcosts/${term}`, {headers: headers});
    }

    getSumaryIndirectCosts(): Observable<any>{
      const token = this.#cookieService.get('token');
      const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      return this.#http.get<any>(`${this.#url}sumaryindirectcosts`, {headers: headers});
    }

  //!categorias de costos indirectos
  getCategoriesIndirectCosts(): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.get<any>(`${this.#url}categoriesindirectcosts`, {headers: headers});
  }

  searchCategoriesIndirectCosts(term: string): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.get<any>(`${this.#url}searchcategoriesindirectcosts/${term}`, {headers: headers});
  }

  postIndirectCostNew(data: any): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.post<any>(`${this.#url}categoriesindirectcosts`, data, {headers: headers});
  }

  getIndirectCost(id: number): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.get<any>(`${this.#url}categoriesindirectcosts/${id}`, {headers: headers});
  }

  modifyIndirectCost(id: number, data: any): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.post<any>(`${this.#url}categoriesindirectcosts/${id}`, data, {headers: headers});
  }

  deleteIndirectCost(id: number): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.delete<any>(`${this.#url}categoriesindirectcosts/${id}`, {headers: headers});
  }

  getAllCategoriesIndirectCosts(): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.get<any>(`${this.#url}categoriesindirect/total`, {headers: headers});
  }

}
