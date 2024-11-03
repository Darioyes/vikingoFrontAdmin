import { Injectable } from '@angular/core';
import { Alert } from '@interfaces/alerts/alert';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  //instanciamos un observable de tipo Subject para poder emitir y escuchar eventos
  #alertSubject = new Subject<Alert | null>();
  //creamos un observable para poder subscribirnos a los
  alertState$ = this.#alertSubject.asObservable();

  showAlert(icon: string, message: string| Object) {
    //emitimos el evento con el icono y el mensaje
    this.#alertSubject.next({ icon, message });
  }

  hideAlert() {
    //emitimos el evento con un valor nulo para ocultar el alert
    this.#alertSubject.next(null);
  }
}
