import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { LocalStoreService } from "./local-store.service";
import { SharedDataService } from "../interceptors/shared-data-service.service";
import { environment } from "src/environments/environment";
import { User } from "../interfaces/User.interface";
import { ApiResponse } from "../interfaces/ApiResponse.interface";
import { Module } from "../interfaces/Module.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly URL_BACKEND = environment.BACKEND_URL;
  authenticated = true;

  constructor(
    private store: LocalStoreService,
    private http: HttpClient,
    private router: Router,
    private sharedDataService: SharedDataService
  ) {
    this.checkAuth();
  }

  checkAuth(): void {
    // this.authenticated = this.store.getItem("demo_login_status");
  }

  getToken(): string | null {
    return this.store.getItem("pucoToken");
  }

  getUserMock(): Observable<User> {
    return of({} as User);
  }

  normalLogin(credentials: {
    email: string;
    password: string;
  }): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${this.URL_BACKEND}/api/signin`,
      credentials
    );
  }

  signin(credentials: { email: string; password: string }): Observable<any> {
    this.authenticated = true;
    this.store.setItem("demo_login_status", true);
    return of({}).pipe(delay(1500));
  }

  signout(): void {
    this.http
      .post<ApiResponse>(`${this.URL_BACKEND}/api/signout`, null)
      .subscribe(() => {
        localStorage.clear();
        this.router.navigate(["/sessions/signin"]);
      });
  }

  obtenerDatosAdmin(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      `${this.URL_BACKEND}/api/user/user-account`
    );
  }

  obtieneModulos(): void {
    this.http
      .get<ApiResponse>(`${this.URL_BACKEND}/api/role_module/list/my-modules`)
      .subscribe((resp) => {
        sessionStorage.setItem("modulesData", JSON.stringify(resp.data));
      });
  }

  obtieneModulos2(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      `${this.URL_BACKEND}/api/role_module/list/my-modules`
    );
  }

  forgotPassword(email: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${this.URL_BACKEND}/api/recovery/send-code`,
      { email }
    );
  }

  updatePass(
    email: string,
    verificationCode: string,
    password: string
  ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${this.URL_BACKEND}/api/recovery/user-account`,
      { email, verificationCode, password }
    );
  }

  verifyCode(email: string, verificationCode: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${this.URL_BACKEND}/api/recovery/verify-code`,
      { email, verificationCode }
    );
  }
}
