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
export class clientService {
URL_BACKEND = environment.BACKEND_URL;

constructor(private http: HttpClient) {}

updatePage(body, id): Observable<any>{
  let headers = new HttpHeaders();
  headers = headers.set("Content-type", "application/json");
  headers = headers.set(
    "Authorization",
    "Bearer " + localStorage.getItem("pucoToken")
  );
  return this.http.put<any>(
    this.URL_BACKEND + "/api/informationCompany/" + id,
    body,
    {
    headers: headers,
    }
  );
}

getPage(page, id): Observable<any>{
  let headers = new HttpHeaders();
  headers = headers.set("Content-type", "application/json");
  headers = headers.set(
    "Authorization",
    "Bearer " + localStorage.getItem("pucoToken")
  );
  const url = `${this.URL_BACKEND}/api/informationCompany/page?page=${page}&company_id=${id}`;

  return this.http.get<any>(url, { headers });
}

updateCompany(body, id): Observable<any>{
  let headers = new HttpHeaders();
  headers = headers.set("Content-type", "application/json");
  headers = headers.set(
    "Authorization",
    "Bearer " + localStorage.getItem("pucoToken")
  );
  return this.http.put<any>(
    this.URL_BACKEND + "/api/company/" + id,
    body,
    {
    headers: headers,
    }
  );
}

getCompany(id): Observable<any>{
  let headers = new HttpHeaders();
  headers = headers.set("Content-type", "application/json");
  headers = headers.set(
    "Authorization",
    "Bearer " + localStorage.getItem("pucoToken")
  );
  return this.http.get<any>(
    this.URL_BACKEND + "/api/company/" + id,
    {
    headers: headers,
    }
  );
}

sendInfo(body): Observable<any>{
  let headers = new HttpHeaders();
  headers = headers.set("Content-type", "application/json");
  headers = headers.set(
    "Authorization",
    "Bearer " + localStorage.getItem("pucoToken")
  );
  return this.http.post<any>(
    this.URL_BACKEND + "/api/informationCompany/",
    body,
    {
    headers: headers,
    }
  );
  }

}
