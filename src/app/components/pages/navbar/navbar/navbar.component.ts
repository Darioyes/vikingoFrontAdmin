
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AlertsService } from '@services/alerts/alerts.service';
import { LoginService } from '@services/users/login.service';
import { CookieService } from 'ngx-cookie-service';
import { routes } from 'src/app/app.routes';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  public RouterModule = inject(RouterModule)
  public router = inject(Router);
  #userService = inject(LoginService);
  #cookieService = inject(CookieService);
  #alertService = inject(AlertsService);

  public menuItems = routes
  .map(route => route.children ?? [])
  .flat()
  .filter(route => route && route.path)
  .filter(route => !route.path?.includes(':'))

  logout():void {
    // Llamamos al servicio de logout
    this.#userService.logout().subscribe({
      next:(response:any)=>{
        console.log(response);
        console.log(response.response);
        console.log(response.message);
        //borramos cookies
        //borramos las cookies seguras y con politicas de Strict
        this.#cookieService.delete('id', '/', undefined, true, 'Strict');
        this.#cookieService.delete('token', '/', undefined, true, 'Strict');
        this.#cookieService.delete('name', '/', undefined, true, 'Strict');
        this.#cookieService.delete('lastname', '/', undefined, true, 'Strict');
        this.#cookieService.delete('success', '/', undefined, true, 'Strict');
        this.#cookieService.delete('avatar', '/', undefined, true, 'Strict');
        //limpiar el local storage
        localStorage.clear();
        //redirigimos al login
        //this.#alertService.showAlert(response.response, response.message);
        this.router.navigate(['/login']);
      },
      error:(error:any)=>{
        console.log(error);
        const name = this.#cookieService.get('name');
      },
    });
  }
}
