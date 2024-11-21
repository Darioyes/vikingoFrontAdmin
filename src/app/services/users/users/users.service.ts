import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@enviroments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {

  #url = environment.domain;
  #http = inject(HttpClient);
  #cookieService = inject(CookieService);

  getUsers(): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return this.#http.get<any>(`${this.#url}users`, {headers: headers});
  }

  searchUsers(search: string): Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return this.#http.get<any>(`${this.#url}searchusers/${search}`, {headers: headers});

  }

  getDataBasicUser():Observable<any>{
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    return this.#http.get<any>(`${this.#url}databasicusers`, {headers: headers});
  }

}
