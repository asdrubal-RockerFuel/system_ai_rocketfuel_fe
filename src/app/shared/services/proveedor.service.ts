
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: "root",
  })
export class proveedorService{
    URL_BACKEND = environment.BACKEND_URL;

    constructor(private http: HttpClient) {}

		postProveedor(body): Observable<any> {
			let headers = new HttpHeaders();
			headers = headers.set("Content-type", "application/json");
			headers = headers.set(
				"Authorization",
				"Bearer " + localStorage.getItem("pucoToken")
			);
			return this.http.post<any>(
				this.URL_BACKEND + `/api/supplier/create`,
				body,
				{ headers: headers, }
			);
		}

    getListProveedor(page, pagination): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set("Content-type", "application/json");
        headers = headers.set(
          "Authorization",
          "Bearer " + localStorage.getItem("pucoToken")
        );
    
        return this.http.get(this.URL_BACKEND + `/api/supplier/list?page=${page}&limit=${pagination}`,
          {
            headers: headers,
          }
        );
      }

      listAllProveedor(): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set("Content-type", "application/json");
        headers = headers.set(
          "Authorization",
          "Bearer " + localStorage.getItem("pucoToken")
        );
    
        return this.http.get(this.URL_BACKEND + `/api/supplier/list?page=1&limit=10`,
          {
            headers: headers,
          }
        );
      }

   // TODO: Confirmar que el endpoint sea el correcto
    getProveedorById(id: number): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set("Content-type", "application/json");
        headers = headers.set(
          "Authorization",
          "Bearer " + localStorage.getItem("pucoToken")
        );
        return this.http.get<any>(
          this.URL_BACKEND + "/api/supplier/find/" + id,
          { headers: headers, }
        ) }

        
        updateProveedor(id, body): Observable<any> {
          let headers = new HttpHeaders();
          headers = headers.set("Content-type", "application/json");
          headers = headers.set(
            "Authorization",
            "Bearer " + localStorage.getItem("pucoToken")
          );
          return this.http.put<any>(
            this.URL_BACKEND + `/api/supplier/update/${id}`,
            body,
            { headers: headers, }
          );
        }
      //TODO: Confirmar que el endpoint sea el correcto
      disableProveedor(Id, estado): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set("Content-type", "application/json");
        headers = headers.set(
          "Authorization",
          "Bearer " + localStorage.getItem("pucoToken")
        );
        return this.http.put<any>(
          this.URL_BACKEND + `/api/supplier/disable/${Id}`,
          { status: estado },
          { headers: headers, }
        );
      }
}