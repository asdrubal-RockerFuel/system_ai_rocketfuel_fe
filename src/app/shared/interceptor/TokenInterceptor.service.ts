import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError, of, empty } from "rxjs";
// Reemplaza 'auth.service' con tu servicio de autenticación
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { catchError, map } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
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
    // Obtén el token del servicio de autenticación
    const token = this.authService.getToken();

    if (token) {
      // Agrega el token a la cabecera de la solicitud
      request = request.clone({
        setHeaders: {
          Authorization: ` Bearer ${token}`,
        },
      });
    }

    if (!request.headers.has("Content-Type")) {
      request = request.clone({
        setHeaders: {
          "content-type": "application/json",
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error) => {
        // Si hay un error en la respuesta, puedes verificar si es un error de autorización
        if (error.status === 401) {
          // Token no válido o expirado, redirige a la página de inicio de sesión o a otra ruta de tu elección
          this.router.navigate(["/sessions/signin"]); // Reemplaza '/login' con la ruta que desees
        }
        if (error.status === 0) {
          this.router.navigate(["/sessions/signin"]);
        }
        this.presentToast("Ha terminado tu Sesión");
        return throwError(error);
      })
    );
  }
  

  async presentToast(mensaje) {
    const toast = await this.toastr.error(mensaje, "Servidor:", {
      timeOut: environment.timeOutmessage,
      closeButton: true,
      progressBar: true,
    });
  }
}
