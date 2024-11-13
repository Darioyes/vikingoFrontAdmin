import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@enviroments/environment.development';
import { LoginResponse } from '@interfaces/user/ILoginResponse';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class ValidTokenService {
  #url = environment.domain;

  #http = inject(HttpClient);
  #cookieService = inject(CookieService);


  validateToken(): Observable<LoginResponse>{
    const token = this.#cookieService.get('token');
    const idUser = this.#cookieService.get('id');

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,

    });
    return this.#http.get<LoginResponse>(`${this.#url}verifytoken/${idUser}`, {headers: headers});


  }

}
