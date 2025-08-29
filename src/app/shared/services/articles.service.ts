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
export class articlesService {
  URL_BACKEND = environment.BACKEND_URL;

  constructor(private http: HttpClient) {}

  getArticulos(rol, page): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this.http.get<any>(
      this.URL_BACKEND + `/api/${rol}/list/articles/all?page=${page}`,
      {
        headers: headers,
      }
    );
  }

  updateArticulo(rol, articles): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.put<any>(
      this.URL_BACKEND + `/api/${rol}/update/articles/${articles.id}`,
      articles,
      {
        headers: headers,
      }
    );
  }

  habilitarArticulo(rol, articlesId, estado): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.put<any>(
      this.URL_BACKEND + `/api/${rol}/disable/articles/${articlesId}`,
      { state: estado },
      {
        headers: headers,
      }
    );
  }

  createArticulos(rol, articles): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.post<any>(
      this.URL_BACKEND + `/api/${rol}/articles`,
      articles,
      {
        headers: headers,
      }
    );
  }
}
