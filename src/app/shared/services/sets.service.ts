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
export class setsService {
  URL_BACKEND = environment.BACKEND_URL;

  constructor(private http: HttpClient) {}

  getSets(rol, page): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this.http.get<any>(
      this.URL_BACKEND + `/api/${rol}/list/sets/all?page=${page}`,
      {
        headers: headers,
      }
    );
  }

  updateSets(rol, sets): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.put<any>(
      this.URL_BACKEND + `/api/${rol}/update/sets/${sets.id}`,
      sets,
      {
        headers: headers,
      }
    );
  }

  habilitarSets(rol, setsId, estado): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.put<any>(
      this.URL_BACKEND + `/api/${rol}/disable/sets/${setsId}`,
      { state: estado },
      {
        headers: headers,
      }
    );
  }

  createSets(rol, sets): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.post<any>(this.URL_BACKEND + `/api/${rol}/sets`, sets, {
      headers: headers,
    });
  }
}
