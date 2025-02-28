import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AlertsService } from '@services/alerts/alerts.service';
import { MaintenanceService } from '@services/maintenance/maintenance/maintenance.service';
import { MaintenanceProgressService } from '@services/maintenance/maintenanceProgress/maintenance-progress.service';
import { NavbarMenuService } from '@services/menu/navbar-menu.service';
import { ProductsService } from '@services/product/product/products.service';
import { SalesMainService } from '@services/sales/salesMain/sales-main.service';
import { SummaryService } from '@services/summary/summary.service';
import { SupliersServiceService } from '@services/suplier/supliers/supliers-service.service';
import { ValidTokenService } from '@services/token/valid-token.service';
import { TransactionService } from '@services/transactions/transaction/transaction.service';
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
    SupliersServiceService,
    SalesMainService,
    TransactionService,
    { provide: LOCALE_ID, useValue: 'es-CO' },//para que la aplicación se ejecute en español colombiano
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,
    //withHashLocation sirve para que en el servidor siempre vaya al index.html,
    withHashLocation(),
    withComponentInputBinding() //es para que localice los id en las rutas ejemplo/:id
  ),
  //provideClientHydration(),//solo se usa con ssr
    provideHttpClient(
      withFetch(),
      withInterceptors([ errorApiInterceptor]),
    ),
    provideAnimationsAsync(),
]
};
