
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: "root",
  })
export class requirementsService{
    URL_BACKEND = environment.BACKEND_URL;

    constructor(private http: HttpClient) {}


    listRequirements(page, pagination): Observable<any> {
      let headers = new HttpHeaders();
      headers = headers.set("Content-type", "application/json");
      headers = headers.set(
        "Authorization",
        "Bearer " + localStorage.getItem("pucoToken")
      );
      return this.http.get<any>(
        this.URL_BACKEND + `/api/req/list?page=${page}&limit=${pagination}`,
        {
          headers: headers,
        }
      )
    }

    getRequirementById(id: number): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set("Content-type", "application/json");
        headers = headers.set(
          "Authorization",
          "Bearer " + localStorage.getItem("pucoToken")
        );
        return this.http.get<any>(
          this.URL_BACKEND + "/api/req/find/" + id,
          {
            headers: headers,
          }
        )
      }

      postRequirement(body): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set("Content-type", "application/json");
        headers = headers.set(
          "Authorization",
          "Bearer " + localStorage.getItem("pucoToken")
        );
        return this.http.post<any>(
          this.URL_BACKEND + "/api/req/",
          body,
          {
            headers: headers,
          }
        )
      }

      disableRequirementById(id: number, body): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set("Content-type", "application/json");
        headers = headers.set(
          "Authorization",
          "Bearer " + localStorage.getItem("pucoToken")
        );
        return this.http.put<any>(
          this.URL_BACKEND + "/api/req/disable/" + id,
          {status: body},
          {
            headers: headers,
          }
        )
      }

      //TODO: Confirmar que el endpoint sea el correcto
      updateRequirementStatus(userId, estado): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set("Content-type", "application/json");
        headers = headers.set(
          "Authorization",
          "Bearer " + localStorage.getItem("pucoToken")
        );
        return this.http.put<any>(
          this.URL_BACKEND + `/api/requirement/disabled/${userId}`,
          { status: estado },
          {
            headers: headers,
          }
        );
      }
}