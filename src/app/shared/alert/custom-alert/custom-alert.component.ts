import { NgClass, NgStyle } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AlertsService } from '@services/alerts/alerts.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-custom-alert',
    imports: [
        NgClass,
        NgStyle
    ],
    template: `
  @if(show){
    <div class="modal-container" >
      <div class="modal">
        <div class="modal-header" [ngStyle]="{'border-bottom': '1px solid '+color }">
          @if(icon === 'success'){
            <h3><i class="fa-regular fa-circle-check"></i></h3>
          }@else if(icon === 'error'){
            <h3><i class="fa-regular fa-circle-xmark"></i></h3>
          }@else if(icon === 'info'){
            <h3><i class="fa-solid fa-info-circle"></i></h3>
          }
        </div>
        <div class="modal-body">
          <p [innerHTML]="message" [ngStyle]="{'color':color}" ></p>
        </div>
        <div class="modal-footer" [ngStyle]="{'border-top': '1px solid '+color }">
          <button [ngClass]="'btn btn-' + buttonType" (click)="onClose()">Cerrar</button>
        </div>
      </div>
    </div>
  }

  `,
    styleUrl: './custom-alert.component.scss'
})
export class CustomAlertComponent implements OnInit, OnDestroy {

  icon: string = '';
  message: string | object = '';
  show: boolean = false;
  #unsubscribeMail!: Subscription;
  #subscription!: Subscription;
  public color = ''
  public buttonType = '';
  //private userService = inject(UsersService);
  //private alertsService = inject(AlertsService);
  #alertService = inject(AlertsService);
  #cookieService = inject(CookieService);
  public loadingButton: boolean = false;

  ngOnInit() {
    this.#subscription = this.#alertService.alertState$.subscribe(alert => {
      if (alert) {
        this.icon = alert.icon;
        this.message = alert.message;
        this.show = true;
        // Suscríbete a los eventos de clic después de mostrar la alerta
      //this.subscribeToLinkClick();

        if(alert.icon === 'success'){
          this.color = '#198754';
          this.buttonType = 'success';
        }else if(alert.icon === 'error'){
          this.color = '#dc3545';
          this.buttonType = 'danger';
        }else if(alert.icon === 'info'){
          this.color = '#0dcaf0';
          this.buttonType = 'info';
        };
        console.log(this.buttonType);

      } else {
        this.show = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.#subscription){
      this.#subscription?.unsubscribe();

    }
    if (this.#unsubscribeMail){
      this.#unsubscribeMail?.unsubscribe();
    }

  }

  onClose() {
    this.show = false;
  }




  // subscribeToLinkClick() {
  //   setTimeout(() => {
  //     const links = document.getElementsByClassName('verificationLink');
  //     if (links.length > 0) {
  //       for (let i = 0; i < links.length; i++) {
  //         links[i].addEventListener('click', () => {
  //           //Enviar correo de verificación
  //           this.mailVerification();
  //         });
  //       }
  //     }
  //   }, 0);
  // }


  // mailVerification(){
  //   //recuperamos el nombre del usuario que esta en la cookie
  //   const name = this.cookieService.get('name');
  //   this.loadingButton = true;
  //   this.unsubscribeMail =  this.userService.sendEmailVerification().subscribe({
  //     next: (response: any) => {
  //       //console.log(response);
  //       this.alertsService.showAlert('info',name+' se ha enviado un enlace de verificación a su dirección de correo electrónico');
  //       this.loadingButton = false;
  //     },
  //     error: (error: any) => {
  //       console.log(error);
  //       this.loadingButton = false;
  //     }
  //   });
  // }

}
