import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@enviroments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class TransactionService {

  #url = environment.domain;
  #http = inject(HttpClient);
  #cookieService = inject(CookieService);

  getSumaryTransactions(): Observable<any> {
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.#http.get<any>(`${this.#url}sumarytransactions`, {headers: headers});
  };

  getTransactionsUsers(): Observable<any> {
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.#http.get<any>(`${this.#url}transactionsusers`, {headers: headers});
  }

  getTransactionsMaintenance(): Observable<any> {
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.#http.get<any>(`${this.#url}transactionsmaintenance`, {headers: headers});
  }

  getTransactionsPurchaseOrders(): Observable<any> {
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.#http.get<any>(`${this.#url}transactionspurchaseorders`, {headers: headers});
  }

  getTransactionsDirectCosts(): Observable<any> {
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.#http.get<any>(`${this.#url}transactionsdirectcosts`, {headers: headers});
  }

  getTransactionsIndirectCosts(): Observable<any> {
    const token = this.#cookieService.get('token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.#http.get<any>(`${this.#url}transactionsindirectcosts`, {headers: headers});
  }

}
