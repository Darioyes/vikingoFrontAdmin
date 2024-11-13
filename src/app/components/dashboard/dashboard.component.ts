import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@components/pages/header/header.component';
import { NavbarComponent } from '@components/pages/navbar/navbar/navbar.component';
import { SummaryComponent } from '@components/pages/summary/summary.component';
import { NavbarMenuService } from '@services/menu/navbar-menu.service';
import { CustomAlertComponent } from '@shared/alert/custom-alert/custom-alert.component';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    HeaderComponent,
    SummaryComponent,
    CustomAlertComponent,
    NgClass,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  #navbarMenu = inject(NavbarMenuService);

  public activeMenu = signal<boolean>(false);

  // Inyectamos el servicio de tocken

  #cookieService = inject(CookieService);

  ngOnInit(): void {
    this.#navbarMenu.getSubmenuActive().subscribe((value) => {
      this.activeMenu.set(value);
    });
  }

  closeMenu(): void {
    this.#navbarMenu.setSubmenuActive(false);
  }



}
