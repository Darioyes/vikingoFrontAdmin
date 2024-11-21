import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@enviroments/environment.development';
import { ApiProductDetaillResponse } from '@interfaces/poducts/IProductGeneral.interface';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsService {

  #url = environment.domain;
  #http = inject(HttpClient);
  #cookieService = inject(CookieService);

  getProducts(): Observable<ApiProductDetaillResponse>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return this.#http.get<ApiProductDetaillResponse>(`${this.#url}products`, {headers: headers});
  }

  searchProducts(search:string): Observable<ApiProductDetaillResponse>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return this.#http.get<ApiProductDetaillResponse>(`${this.#url}searchproducts/${search}`, {headers: headers});
  }

  infoBasicProducts(): Observable<any> {
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.#http.get<any>(`${this.#url}basicproducts`, {headers: headers});
  };

}
