import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { LoginData } from '@interfaces/user/ILoginData';
import { LoginErrorResponse } from '@interfaces/user/ILoginResponse';
import { AlertsService } from '@services/alerts/alerts.service';
import { LoginService } from '@services/users/login.service';
import { CustomAlertComponent } from '@shared/alert/custom-alert/custom-alert.component';
import { SpinerButtonComponent } from '@shared/spiners/spiner-button/spiner-button.component';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-login-page',
    imports: [
        ReactiveFormsModule,
        SpinerButtonComponent,
        NgClass,
        CustomAlertComponent
    ],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {

   //creamos el formgroup del formulario
   public loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  //?inicializar inyeccion de dependencias
  //inyectamos el formulario
  public formbuilder = inject(FormBuilder);
  #router = inject(Router);
  #loginService = inject(LoginService);
  #cookieService = inject<any>(CookieService);
  private alertService = inject(AlertsService);



  //declarar variables
   public padlock:boolean = true;
   public loadingButton:boolean = false;
   #unsubscribe!: Subscription;
   public invalidform = signal<boolean>(false);

   ngOnInit(): void {
 //inicializamos el formulario del formgroup
    this.loginForm = this.formbuilder.group({
      email: ['',Validators.compose([Validators.required, Validators.email])],
      password: ['',Validators.compose([Validators.required])],
    });
  }
  ngOnDestroy(): void {

    if (this.#unsubscribe){
      this.#unsubscribe?.unsubscribe();
    };
  }
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

   padlockToggle(){
      this.padlock = !this.padlock;
   }

  //funcion de login
   loginUser(){
    this.loadingButton = true;
    //validamos que no hay token en las cookies
    if(!this.#cookieService.check('token')){

      //validamos el formulario
      if(this.loginForm.valid){
        //creamos el objeto de datos
        const loginData: LoginData = {
          email: this.loginForm.get('email')?.value || '',  // Asegura que siempre sea string
          password: this.loginForm.get('password')?.value || '' // Asegura que siempre sea string
        };
        //llamamos al servicio de login
        this.#unsubscribe = this.#loginService.login(loginData).subscribe({
          next:(data:any)=>{
            //calcular la fecha de expiración del token en 30 días
            const expiresDate = new Date();
            expiresDate.setDate(expiresDate.getDate() + 30);
            // Guardamos el token en las cookies
            this.#cookieService.set('token', data.token!, expiresDate, '/', undefined, true, 'Strict');
            // Guardamos el id en las cookies
            this.#cookieService.set('id', data.data!.id!, expiresDate, '/', undefined, true, 'Strict');
            // Guardamos el nombre y el response en las cookies
            this.#cookieService.set('name', data.data!.name!, expiresDate, '/', undefined, true, 'Strict');
            // Guardamos el apellido y el response en las cookies
            this.#cookieService.set('lastname', data.data!.lastname!, expiresDate, '/', undefined, true, 'Strict');
            this.#cookieService.set('success', data.response!, expiresDate, '/', undefined, true, 'Strict');
            this.#cookieService.set('avatar', data.data!.image!, expiresDate, '/', undefined, true, 'Strict');
            this.loadingButton = false;
            this.#router.navigate(['/home']);
          },
          error:(error:LoginErrorResponse)=>{
            console.log(error);
             // Inicializamos una variable para acumular los mensajes de error
              let errorMessages = '';

          // Verificamos si hay errores específicos
            if (error.errorVikingo.errors) {
              // Recorremos los errores
              for (const key in error.errorVikingo.errors) {

                if (error.errorVikingo.errors.hasOwnProperty(key)) {
                  // Concatenamos los errores con un salto de línea o un separador
                  errorMessages += `${error.errorVikingo.errors[key]}<br>`;
                }
                this.loadingButton = false;
              }

            // Mostrar todos los errores concatenados
            this.alertService.showAlert('error', errorMessages.trim());
            this.loadingButton = false;
          }else{
              this.alertService.showAlert('error',error.errorVikingo.message);


              this.loadingButton = false;
            }
          },
          complete:()=>{
            //this.loadingButton = false;
          }
        });
      }else{
        this.loadingButton = false;
        this.invalidform.set(true);
      }
      this.loadingButton = false;
    }
    //mensaje de error porque ya hay un token en las cookies
    else{
      this.alertService.showAlert('error','Ya hay una sesión activa');
      this.loadingButton = false;
    }
   }

}
