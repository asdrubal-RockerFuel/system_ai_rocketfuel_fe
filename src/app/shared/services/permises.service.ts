import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { SetModulesAndOperationsDto } from "src/app/views/pages/maestro-rol/permises-modules/permises-modules.component";

@Injectable({
  providedIn: "root",
})
export class permisosService {
  URL_BACKEND = environment.BACKEND_URL;

  constructor(private http: HttpClient) {}

  getpermisos(id : number): Observable<IResponse<IModulesWithOperations[]>> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this.http.get<IResponse<IModulesWithOperations[]>>(
      this.URL_BACKEND + `/api/role_module/list/operations/role/${id}`,
      {
        headers: headers,
      }
    );
  }

  savePermisos(permisos : SetModulesAndOperationsDto) : Observable<IResponse<SetModulesAndOperationsDto>>
  {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this.http.post<IResponse<SetModulesAndOperationsDto>>(
      this.URL_BACKEND + `/api/role_module/set/permissions/role/`,
      permisos, {headers: headers,}
    );
  }

  getpermisosoutpagination(rol): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );

    return this.http.get<any>(this.URL_BACKEND + `/api/list/permisos/`, {
      headers: headers,
    });
  }

  updatepermisos(rol, permisos): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.put<any>(
      this.URL_BACKEND + `/api/permisos/update/${permisos.id}`,
      permisos,
      {
        headers: headers,
      }
    );
  }

  habilitarpermisos(rol, permisosId, estado): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.put<any>(
      this.URL_BACKEND + `/api/permisos/disable/${permisosId}`,
      { status: estado },
      {
        headers: headers,
      }
    );
  }

  createpermisos(rol, permisos): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("pucoToken")
    );
    return this.http.post<any>(
      this.URL_BACKEND + `/api/permisos/create`,
      permisos,
      {
        headers: headers,
      }
    );
  }
}

interface IOperations {
  id: number;
  name: string;
  method: string;
  is_in_use: boolean;
}

export interface IModulesWithOperations {
  module_id: number;
  module_name: string;
  module_status: boolean;
  is_in_use: boolean;
  operations: IOperations[];
}

export interface IResponse<T>{
  success : boolean,
  message : string,
  data: T
}