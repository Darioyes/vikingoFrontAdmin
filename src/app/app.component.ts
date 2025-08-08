import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CustomAlertComponent } from '@shared/alert/custom-alert/custom-alert.component';
import { CookieService } from 'ngx-cookie-service';


@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'vikingoTech';
  #cookieService = inject<any>(CookieService);
  #router = inject(Router);

  ngOnInit() {
    this.validateSesion();
  }

  //funcion para obtener el token en las cookies
  validateSesion() {
    //validamos que no hay token en las cookies
    if (this.#cookieService.get('token') != null) {
      //redirigimos al dashboard
      this.#router.navigate(['/home']);
    }
  }
}
