
import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AlertsService } from '@services/alerts/alerts.service';
import { NavbarMenuService } from '@services/menu/navbar-menu.service';
import { ValidTokenService } from '@services/token/valid-token.service';
import { LoginService } from '@services/users/login.service';
import { CookieService } from 'ngx-cookie-service';
import { routes } from 'src/app/app.routes';

@Component({
    selector: 'app-navbar',
    imports: [
        CommonModule,
        RouterModule
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {


  public RouterModule = inject(RouterModule);
  public router = inject(Router);
  #navbarMenu = inject(NavbarMenuService);
  #userService = inject(LoginService);
  #cookieService = inject(CookieService);
  #alertService = inject(AlertsService);

  // Inyectamos el servicio de tocken
  public verifyToken = inject(ValidTokenService);
  public session:boolean = true;
  public submenuActive = false;
  public activeMenu!:boolean;

    //Detectar cambios en el tamaño de la ventana
    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
      const width = (event.target as Window).innerWidth;
      this.updateActiveMenu(width);
    }

  public menuItems = routes
  .map(route => route.children ?? [])
  .flat()
  .filter(route => route && route.path)
  .filter(route => !route.path?.includes(':'))

  //implementar el metodo ngOnInit
  ngOnInit(): void {
    this.veryToken();


  }

    // Método para actualizar activeMenu basado en el ancho de la ventana
    private updateActiveMenu(width: number): void {
      this.activeMenu = width > 1000;
    }

  validarMenu():void {
    if(window.innerWidth <= 1000){
      this.activeMenu = !this.activeMenu;
      this.#navbarMenu.setSubmenuActive(this.submenuActive);
    }
  }

  logout():void {
    // Llamamos al servicio de logout
    this.#userService.logout().subscribe({
      next:(response:any)=>{
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

  veryToken(): void {

      //esperar 2 segundos para redirigir al login
      setTimeout(() => {
         //llamamos al servicio de validacion de token
    this.verifyToken.validateToken().subscribe({
      next: (response: any) => {

      },
      error: (error: any) => {
        if (error.errorVikingo.message === 'Unauthenticated.') {
          this.logoutSession();
          console.log(error.errorVikingo.message);
          
        }
      },
      
    });
      }, 3000);


  }

  logoutSession():void {
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
  }


}
