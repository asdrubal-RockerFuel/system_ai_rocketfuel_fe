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
export class areaService {
  URL_BACKEND = environment.BACKEND_URL;

  constructor(private http: HttpClient) {}

  getarea(page, pagination): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this.http.get<any>(this.URL_BACKEND + `/api/area/list?page=${page}&limit=${pagination}`, {
      headers: headers,
    });
  }
  getareaoutpagination(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this.http.get<any>(this.URL_BACKEND + `/api/area/list/`, {
      headers: headers,
    });
  }

  getareaByOffice(office_id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this.http.get<any>(this.URL_BACKEND + `/api/area/list?useFilters=1&office_id=${office_id}`, {
      headers: headers,
    });
  }

  updatearea(rol, area): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.put<any>(
      this.URL_BACKEND + `/api/area/update/${area.id}`,
      area,
      {
        headers: headers,
      }
    );
  }

  habilitararea(rol, areaId, estado): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.put<any>(
      this.URL_BACKEND + `/api/area/disable/${areaId}`,
      { status: estado },
      {
        headers: headers,
      }
    );
  }

  createarea(rol, area): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.post<any>(this.URL_BACKEND + `/api/area/create`, area, {
      headers: headers,
    });
  }
}
