import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@enviroments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class CategoriesProductsService {

    #url = environment.domain;
    #http = inject(HttpClient);
    #cookieService = inject(CookieService);

  getCategoriesProducts(): Observable<any> {

    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return this.#http.get<any>(`${this.#url}categoriesproducts`, { headers: headers });

  }

    getPaginator(url:string): Observable<any>{
      const token = this.#cookieService.get('token');
      const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
  
      return this.#http.get<any>(url, {headers: headers});
    }

    searchCategoriesProducts(term: string): Observable<any>{

    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return this.#http.get<any>(`${this.#url}searchcategoriesproducts/${term}`, { headers: headers });
  }
}
