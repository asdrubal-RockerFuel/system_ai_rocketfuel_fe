import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
/* import { environment } from 'src/environments/environment';
 */

// import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: "root",
})
export class RolService {
  URL_BACKEND = environment.BACKEND_URL;
  private _us_er_ro_l: number = null;
  private _us_er_id: number = null;
  private _u_s_e_r_d_a_t_a: any = null;
  constructor(
    private _router: Router, 
    public _http: HttpClient) {}

  getId() {
    return this._us_er_id;
  }

  setId(id: number) {
    this._us_er_id = id;
  }

  getR() {
    console.log(this._us_er_ro_l);
    return this._us_er_ro_l;
  }

  setR(rol: number) {
    this._us_er_ro_l = rol;
  }
  getData() {
    return this._u_s_e_r_d_a_t_a;
  }
  setData(data: any) {
    this._u_s_e_r_d_a_t_a = data;
    /*     this.asignarEstiloLog();
     */
  }

  /*   noPermission() {
    this.notifierService.systemNotify({
      title: "Info",
      message: "No tiene permisos para realizar esta acción.",
      type: "info",
    });
  }
 */
  /*   cerrarSesion() {
    this._logout.Logout().subscribe();
    localStorage.removeItem("jwt");
    localStorage.removeItem("nombreCompleto");
    localStorage.clear();
    // this.cookieService.delete('jwt');
    this._router.navigate(["/login"]);
  } */
  //estilos works
  /*   asignarEstiloLog() {
    localStorage.setItem("us_st", this._u_s_e_r_d_a_t_a.nightmode);
    if ("" + this._u_s_e_r_d_a_t_a.nightmode == "false") {
      this._sStyle.setStyle(Style.default);
    } else if ("" + this._u_s_e_r_d_a_t_a.nightmode == "true") {
      this._sStyle.setStyle(Style.dark);
    }
  } */
  /*   asignarEstiloLS() {
    let estilo = localStorage.getItem("us_st");
    if (estilo) {
      if (estilo == "false") {
        this._sStyle.setStyle(Style.default);
      } else if (estilo == "true") {
        this._sStyle.setStyle(Style.dark);
      }
    } else {
      this._sStyle.setStyle(Style.default);
    }
  }
 */
  toggleModeLS() {
    // localStorage.setItem("us_st", mode);
    // let t = Boolean(localStorage.getItem("us_st"));
    let boolValue =
      localStorage.getItem("us_st").toLowerCase() == "true" ? true : false;
    localStorage.setItem("us_st", `${!boolValue}`);
  }

  getAllRoles(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this._http.get(this.URL_BACKEND + "/api/role/list",
      {
        headers: headers,
      }
    );
  }

  getPaginationRoles(page, pagination): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this._http.get(this.URL_BACKEND + `/api/role/list?page=${page}&limit=${pagination}`,
      {
        headers: headers,
      }
    );
  }

  postRole(body): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this._http.post(this.URL_BACKEND + "/api/role/create",
      body,
      {
        headers: headers,
      }
    );
  }

  disableRole(body, id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this._http.put(this.URL_BACKEND + "/api/role/disable/" + id,
      body,
      {
        headers: headers,
      }
    );
  }

  putRole(body, id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this._http.put(this.URL_BACKEND + "/api/role/update/" + id,
      body,
      {
        headers: headers,
      }
    );
  }
}
