import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@enviroments/environment.development';
import { ApiResponse } from '@interfaces/response/IGeneralResponse';
import { LoginData } from '@interfaces/user/ILoginData';
import { LoginResponse } from '@interfaces/user/ILoginResponse';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {

  #url = environment.domain;
  #http = inject(HttpClient);
  #cookieService = inject(CookieService);

  //login de usuario
  login(data:LoginData): Observable<LoginResponse>{
    const headers = new HttpHeaders({
      'Accept': 'application/json',

    });
    return this.#http.post<LoginResponse>(`${this.#url}vikingouser/login`, data, {headers: headers});
  }

  logout(): Observable<ApiResponse>{
    const token = this.#cookieService.get('token');

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    // Pasar los encabezados como opciones en lugar de en el cuerpo
    const options = {
      headers: headers
    };
    console.log(token);
    return this.#http.post<ApiResponse>(`${this.#url}vikingouser/logout`,  null, options);
  }

}
