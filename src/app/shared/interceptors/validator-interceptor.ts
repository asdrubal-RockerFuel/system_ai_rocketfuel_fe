import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "An unexpected error occurred";

        if (error.error && error.error.message) {
          // Usa el mensaje del backend si está disponible
          errorMessage = error.error.message;
        } else if (error.status === 0) {
          // Error de red o servidor inaccesible
          errorMessage = "Cannot reach the server. Please try again later.";
        } else if (error.status >= 500) {
          // Error interno del servidor
          errorMessage = "Server error occurred. Please contact support.";
        } else if (error.status === 404) {
          errorMessage = "Requested resource not found.";
        } else if (error.status === 401) {
          errorMessage = "Unauthorized access. Please login.";
        } else if (error.status === 403) {
          errorMessage = "Forbidden access.";
        }

        console.error("HTTP Error:", error);
        this.toastr.error(errorMessage, "Server:", {
          timeOut: environment.timeOutmessage,
          closeButton: true,
          progressBar: true,
        });

        return throwError(() => error);
      })
    );
  }
}
