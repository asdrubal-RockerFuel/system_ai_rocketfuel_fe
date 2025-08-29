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
export class programService {
  URL_BACKEND = environment.BACKEND_URL;

  constructor(private http: HttpClient) {}

  getprogram_iniciative(page, limit): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this.http.get<any>(
      this.URL_BACKEND + `/api/program_iniciative/list?page=${page}&limit=${limit}`,
      {
        headers: headers,
      }
    );
  }
  getprogram_iniciativeoutpagination(office_id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this.http.get<any>(
      this.URL_BACKEND + `/api/program_iniciative/list`,
      {
        headers: headers,
      }
    );
  }

  getprogram_iniciativeByOffice(office_id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this.http.get<any>(
      this.URL_BACKEND + `/api/program_iniciative/list?useFilters=1&office_id=${office_id}`,
      {
        headers: headers,
      }
    );
  }

  updateprogram_iniciative(rol, program_iniciative): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.put<any>(
      this.URL_BACKEND +
        `/api/program_iniciative/update/${program_iniciative.id}`,
      program_iniciative,
      {
        headers: headers,
      }
    );
  }

  habilitarprogram_iniciative(
    rol,
    program_iniciativeId,
    estado
  ): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.put<any>(
      this.URL_BACKEND +
        `/api/program_iniciative/disable/${program_iniciativeId}`,
      { state: estado },
      {
        headers: headers,
      }
    );
  }

  createprogram_iniciative(rol, program_iniciative): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.post<any>(
      this.URL_BACKEND + `/api/program_iniciative/create`,
      program_iniciative,
      {
        headers: headers,
      }
    );
  }
}
