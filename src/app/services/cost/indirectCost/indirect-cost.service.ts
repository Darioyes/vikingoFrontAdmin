import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@enviroments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndirectCostService {

    #url = environment.domain;
    #http = inject(HttpClient);
    #cookieService = inject(CookieService);

    getIndirectCosts(): Observable<any>{
      const token = this.#cookieService.get('token');
      const headers = {
        'Accept': 'application',
        'Authorization': `Bearer ${token}`
      };
      return this.#http.get<any>(`${this.#url}indirectcosts`, {headers: headers});
    }

    searchIndirectCosts(term: string): Observable<any>{
      const token = this.#cookieService.get('token');
      const headers = {
        'Accept': 'application',
        'Authorization': `Bearer ${token}`
      };
      return this.#http.get<any>(`${this.#url}searchindirectcosts/${term}`, {headers: headers});
    }

}
