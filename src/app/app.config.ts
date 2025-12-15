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
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideToastr } from "ngx-toastr";

import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./shared/inmemory-db/inmemory-db.service";
import { routes } from "./app.routes";
import { HttpErrorInterceptor } from "./shared/interceptors/validator-interceptor";
import { AuthHeaderInterceptor } from "./shared/interceptors/authheader-interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      InMemoryWebApiModule.forRoot(InMemoryDataService, {
        passThruUnknownUrl: true,
      })
    ),
    provideZoneChangeDetection({ eventCoalescing: false }),
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
      newestOnTop: true,
    }),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
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
