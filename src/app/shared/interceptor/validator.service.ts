import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
  HttpEvent,
  HttpResponse,
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
        console.log("error,general", error);
        this.toastr.error(`${error.error.message}`, "Servidor:", {
          timeOut: environment.timeOutmessage,
          closeButton: true,
          progressBar: true,
        });
        /*   if (error.status === 401) {
          this._sGenerales.unauthorized();
        } */
        return throwError(error);
      })
    );
  }
}
