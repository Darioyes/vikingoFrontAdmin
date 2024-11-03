import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { errorApiInterceptor } from './interceptors/errorInterceptor/error-api.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes,
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
