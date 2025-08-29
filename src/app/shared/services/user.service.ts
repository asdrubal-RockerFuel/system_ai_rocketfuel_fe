import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class userService {
  URL_BACKEND = environment.BACKEND_URL;

  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.get<any>(
      this.URL_BACKEND + "/api/user/find/" + id,
      {
        headers: headers,
      }
    );
  }

  createUser(body: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.post<any>(
      this.URL_BACKEND + "/api/user/create",
      body,
      {
        headers: headers,
      }
    );
  }

  getCompanies(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.post<any>(
      this.URL_BACKEND + "/api/company/list/private",
      null,
      {
        headers: headers,
      }
    );
  }


  createCompany(body): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.post<any>(
      this.URL_BACKEND + "/api/company",
      body,
      {
        headers: headers,
      }
    );
  }

  getUserListFilterName(page, limit, filter): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this.http.get<any>(
      this.URL_BACKEND + `/api/user/list/?page=${page}&limit=${limit}&useFilters=1&fullName=${filter}`,
      {
        headers: headers,
      }
    );
  }

  getUserList(page, limit): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this.http.get<any>(
      this.URL_BACKEND + `/api/user/list/?page=${page}&limit=${limit}`,
      {
        headers: headers,
      }
    );
  }

  getUsuarios(rol, page): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this.http.get<any>(
      this.URL_BACKEND + `/api/${rol}/list/users/all?page=${page}`,
      {
        headers: headers,
      }
    );
  }

  getUsuariosCompany(id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this.http.get<any>(
      this.URL_BACKEND + `/api/user/${id}`,
      {
        headers: headers,
      }
    );
  }

  updateClientV(user): Observable<any> {
    let u = {
      name: user.name,
      lastname: user.lastname,
      // id_company:Number(user.id_company)
    };

    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.put<any>(
      this.URL_BACKEND + '/api/client/update/users/' + user.id,
      u,
      {
        headers: headers,
      }
    );
  }

  updateAdmin(user): Observable<any> {
    let u = {
      name: user.name,
      paternal_lastname: user.paternal_lastname,
      maternal_lastname: user.maternal_lastname,
      document_type: user.document_type,
      document_number: String(user.document_number),
      email: user.email,
      office_id: Number(user.office_id),
      program_id: Number(user.program_id),
      area_id: Number(user.area_id),
      notifications: user.notifications,
      roles: user.roles
    };

    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.put<any>(
      this.URL_BACKEND + `/api/user/update/${user.id}`,
      u,
      {
        headers: headers,
      }
    );
  }

  habilitarAdmin(userId, estado): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.put<any>(
      this.URL_BACKEND + `/api/user/disable/${userId}`,
      { status: estado },
      {
        headers: headers,
      }
    );
  }
  
  habilitarViewer(userId, estado): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.put<any>(
      this.URL_BACKEND +  '/api/client/update/users/' + userId,
      { state: estado },
      {
        headers: headers,
      }
    );
  }

  // habilitarClient(userId, estado): Observable<any> {
  //   let headers = new HttpHeaders();
  //   headers = headers.set("Content-type", "application/json");
  //   headers = headers.set(
  //     "Authorization",
  //     "Bearer " + localStorage.getItem("pucoToken")
  //   );
  //   return this.http.put<any>(
  //     this.URL_BACKEND +  '/api/admin/disable/user/' + userId,
  //     { state: estado },
  //     {
  //       headers: headers,
  //     }
  //   );
  // }

  createClient( user ): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.post<any>(
      this.URL_BACKEND + `/api/new/${user.admin_rol_id}`,
      user,
      {
        headers: headers,
      }
    );
  }

  createAdmin( user, nameRol): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.post<any>(
      this.URL_BACKEND + `/api/admin/new/${nameRol}`,
      user,
      {
        headers: headers,
      }
    );
  }
}
