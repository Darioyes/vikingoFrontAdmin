import { ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, inject, Injectable, } from '@angular/core';
import { Alert } from '@interfaces/alerts/alert';
import { Subject } from 'rxjs';
import { ConfirmAlertComponent } from '../../shared/alert/confirm-alert/confirm-alert.component'; // Adjusted the path to match the relative file structure

@Injectable()
export class AlertsService {


  appRef = inject(ApplicationRef);
  injector = inject(EnvironmentInjector);


  id: any = null;

  //instanciamos un observable de tipo Subject para poder emitir y escuchar eventos del custom alert
  #alertSubject = new Subject<Alert | null>();
  //creamos un observable para poder subscribirnos a los eventos del custom alert
  alertState$ = this.#alertSubject.asObservable();



  //instanciamos un observable de tipo Subject para poder emitir y escuchar eventos del custom alert
  showAlert(icon: string, message: string| Object) {
    //emitimos el evento con el icono y el mensaje
    this.#alertSubject.next({ icon, message });
  }


  //--------------- confirm alert --------------------------

  //función pública que se llama desde cualquier componente
  async openAlert(icon: 'alert' | 'info' | 'success' | 'error', message: string): Promise<boolean> {
    // ser retorna una promesa para que el componente que llama al modal pueda esperar la respuesta de usuario
    return new Promise((resolve) => {
      // crea el componente o modal
      const componentRef: ComponentRef<ConfirmAlertComponent> = createComponent(ConfirmAlertComponent, {
        environmentInjector: this.injector
      });

      // insertamos el icono al modal
      componentRef.instance.icons = icon;
      // insertamos el mensa
      componentRef.instance.message = message;

      // Esto escucha el @Output() llamado close que el componente dispara cuando el usuario confirma o cancela.
      componentRef.instance.show.subscribe((result: boolean) => {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
        resolve(result);
      });

      // insertamos el componente en el DOM
      this.appRef.attachView(componentRef.hostView);
      // obtenemos el elemento DOM
      const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
      // lo insertamos en el body
      document.body.appendChild(domElem);
    });
  }

}
