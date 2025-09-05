import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../services/auth.service";
import { environment } from "../../../environments/environment";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private has401Error = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

    // Clonar request y agregar headers
    let modifiedRequest = request.clone({
      setHeaders: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "Content-Type": request.headers.has("Content-Type")
          ? request.headers.get("Content-Type")!
          : "application/json",
      },
    });

    return next
      .handle(modifiedRequest)
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if ((error.status === 401 || error.status === 0) && !this.has401Error) {
      this.has401Error = true;
      this.router.navigate(["/sessions/signin"]);
      this.showToast("Your session has ended");
    } else if (error.status !== 401 && error.status !== 0) {
      this.showToast(error.message || "An error occurred on the server");
    }

    return throwError(() => error);
  }

  private showToast(message: string): void {
    this.toastr.error(message, "Server:", {
      timeOut: environment.timeOutmessage,
      closeButton: true,
      progressBar: true,
    });
  }
}
