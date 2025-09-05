import { provideRouter } from "@angular/router";
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from "@angular/core";
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";

import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./shared/inmemory-db/inmemory-db.service";
import { routes } from "./app.routes";
import { HeaderInterceptor } from "./shared/interceptors/header-interceptor";
import { TokenInterceptor } from "./shared/interceptors/token-interceptor";
import { HttpErrorInterceptor } from "./shared/interceptors/validator-interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      InMemoryWebApiModule.forRoot(InMemoryDataService, {
        passThruUnknownUrl: true,
      })
    ),
    provideZoneChangeDetection({ eventCoalescing: false }),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    provideRouter(routes), // reemplaza [] por tus rutas
  ],
};
