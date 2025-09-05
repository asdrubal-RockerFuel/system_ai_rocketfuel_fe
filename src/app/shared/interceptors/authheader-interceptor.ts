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
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../services/auth.service";
import { environment } from "../../../environments/environment";

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  private has401Error = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    // Determinar si Content-Type debe agregarse
    const isFormData = request.body instanceof FormData;

    const headersConfig: any = {};
    if (token) headersConfig["Authorization"] = `Bearer ${token}`;
    if (!isFormData && !request.headers.has("Content-Type")) {
      headersConfig["Content-Type"] = "application/json";
    }

    const modifiedRequest = request.clone({ setHeaders: headersConfig });

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
