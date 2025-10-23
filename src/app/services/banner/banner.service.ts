import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@enviroments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class BannerService {

  #url = environment.domain;
  #http = inject(HttpClient);
  #cookieService = inject(CookieService);

  getBanners():Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.get<any>(`${this.#url}carousel`, {headers: headers});
  }

  getBanner(id: number):Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    return this.#http.get<any>(`${this.#url}carousel/${id}`, {headers: headers})
  }

  modifyBanner(id: number, data: FormData):Observable<any> {
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.post<any>(`${this.#url}carousel/${id}`, data, { headers: headers });
  }

  updateBannerOrder(banners: { id: number; order: number }[]):Observable<any> {
        const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.post(`${this.#url}carousel/update-order`, { banners }, { headers: headers });
  }

  searchCarousel(term: string):Observable<any> {
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    return this.#http.get<any>(`${this.#url}searchcarousel/${term}`, { headers: headers });
  }

}
