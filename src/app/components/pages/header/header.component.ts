import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { environment } from '@enviroments/environment.development';
import { NavbarMenuService } from '@services/menu/navbar-menu.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  public animationHamburger = false;

  #navbarMenu = inject(NavbarMenuService);
  #cookieService = inject(CookieService);

  public activeMenu!:boolean;
  public name = signal<string>('');
  public lastname= signal<string>('');
  public avatar = signal<string>('');
  public urlImage = environment.domainimage;



  ngOnInit(): void {
    this.updateActiveMenu(window.innerWidth);
    this.#navbarMenu.setSubmenuActive(this.activeMenu);
    this.name.set(this.#cookieService.get('name'));
    this.lastname.set(this.#cookieService.get('lastname'));
    this.avatar.set(this.#cookieService.get('avatar'));
  }

  //Detectar cambios en el tamaño de la ventana
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const width = (event.target as Window).innerWidth;
    this.updateActiveMenu(width);
  }

  // Método para actualizar activeMenu basado en el ancho de la ventana
  private updateActiveMenu(width: number): void {
    this.activeMenu = width > 1000;
  }
 //animacion de menu hamburguesa
 toggleMenu():void {
  if(window.innerWidth <= 1000){
    this.activeMenu = !this.activeMenu;
  }else{
    this.activeMenu = true;
  }
  this.animationHamburger = !this.animationHamburger;
  this.#navbarMenu.setSubmenuActive(this.activeMenu);
}

}
