import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@enviroments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  #url = environment.domain;
  #http = inject(HttpClient);
  #cookieService = inject(CookieService);

  getCities(): Observable<any> {
    const token = this.#cookieService.get('token');

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    return this.#http.get<any>(`${this.#url}citiesinput`, { headers });
  }
}
