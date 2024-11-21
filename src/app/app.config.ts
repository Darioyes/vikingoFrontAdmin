import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AlertsService } from '@services/alerts/alerts.service';
import { MaintenanceService } from '@services/maintenance/maintenance/maintenance.service';
import { MaintenanceProgressService } from '@services/maintenance/maintenanceProgress/maintenance-progress.service';
import { NavbarMenuService } from '@services/menu/navbar-menu.service';
import { ProductsService } from '@services/product/product/products.service';
import { SummaryService } from '@services/summary/summary.service';
import { ValidTokenService } from '@services/token/valid-token.service';
import { LoginService } from '@services/users/login.service';
import { UsersService } from '@services/users/users/users.service';
import { routes } from './app.routes';
import { errorApiInterceptor } from './interceptors/errorInterceptor/error-api.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    //colocamos los servicios que se van a usar en la aplicación y solo se injectan cuando se necesitan
    LoginService,
    AlertsService,
    NavbarMenuService,
    ValidTokenService,
    SummaryService,
    MaintenanceProgressService,
    MaintenanceService,
    ProductsService,
    UsersService,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,
    //withHashLocation sirve para que en el servidor siempre vaya al index.html,
    withHashLocation()
  ),
  //provideClientHydration(),//solo se usa con ssr
    provideHttpClient(
      withFetch(),
      withInterceptors([ errorApiInterceptor]),
    ), provideAnimationsAsync(),
]
};
