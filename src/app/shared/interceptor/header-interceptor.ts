import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { LocalStoreService } from "../services/local-store.service";

@Injectable({
  providedIn: "root",
})
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private store: LocalStoreService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.store.getItem("pucoToken");

    // Si hay token, clonamos la request y agregamos el header
    const authReq = token
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
      : req.clone({ setHeaders: { "Content-Type": "application/json" } });

    return next.handle(authReq);
  }
}
