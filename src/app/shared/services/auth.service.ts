import { Injectable } from "@angular/core";
import { LocalStoreService } from "./local-store.service";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { SharedDataService } from "../interceptor/shared-data-service.service";
import { NavigationService } from "./navigation.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  //Only for demo purpose
  authenticated = true;
  URL_BACKEND = environment.BACKEND_URL;
  constructor(
    private store: LocalStoreService,
    public _http: HttpClient,
    private router: Router,
    private sharedDataService: SharedDataService // Inyecta el servicio compartido
  ) {
    this.checkAuth();
  }

  checkAuth() {
    // this.authenticated = this.store.getItem("demo_login_status");
  }

  getToken(): string | null {
    return localStorage.getItem("pucoToken");
  }

  getuser() {
    return of({});
  }

  normalLogin(formulario): Observable<any> {
    // console.log(token)

    return this._http.post(this.URL_BACKEND + "/api/signin", formulario);
  }

  signin(credentials) {
    this.authenticated = true;
    this.store.setItem("demo_login_status", true);
    return of({}).pipe(delay(1500));
  }
  signout() {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    this._http
      .post(environment.BACKEND_URL + "/api/signout", null, {
        headers: headers,
      })
      .subscribe((resp) => {
        localStorage.clear();
        this.router.navigate(["/sessions/signin"]);
      });
  }

  obtenerDatosAdmin(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this._http.get<any>(this.URL_BACKEND + "/api/user/user-account", {
      headers: headers,
    });
  }

  obtieneModulos() {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    // Realiza la solicitud HTTP
    this._http
      .get<any>(this.URL_BACKEND + `/api/role_module/list/my-modules`, {
        headers: headers,
      })
      .subscribe((data) => {
        console.log("data", data);
        // this.navigationService.defaultMenu = [];
        // data.data.forEach(item => {
        //   item.functionalities.forEach(element => {
        //     this.navigationService.defaultMenu.push({
        //       name: element.name,
        //       type: "link",
        //       icon: element.icon,
        //       state: `/pages/${element.path}`,
        //     })
        //   });
        // });
        // Almacena los datos en SharedDataService
        /*   this.sharedDataService.modules = data; */
        sessionStorage.setItem("modulesData", JSON.stringify(data.data));
      });
  }

  obtieneModulos2() {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    // Realiza la solicitud HTTP
    return this._http.get<any>(
      this.URL_BACKEND + `/api/role_module/list/my-modules`,
      {
        headers: headers,
      }
    );
  }

  forgotPassword(email): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Basic " + localStorage.getItem("pucoToken")
    );

    return this._http.post(this.URL_BACKEND + "/api/recovery/send-code", {
      email,
    });
  }

  updatePass(email, verificationCode, password): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Basic " + localStorage.getItem("pucoToken")
    );

    return this._http.post(this.URL_BACKEND + "/api/recovery/user-account", {
      email,
      verificationCode,
      password,
    });
  }

  verifyCode(email, verificationCode): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Basic " + localStorage.getItem("pucoToken")
    );

    return this._http.post(this.URL_BACKEND + "/api/recovery/verify-code", {
      email,
      verificationCode,
    });
  }
}
