import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class RolService {
  private readonly URL_BACKEND = environment.BACKEND_URL;
  private _userRole: number | null = null;
  private _userId: number | null = null;
  private _userData: any = null;

  constructor(private router: Router, private http: HttpClient) {}

  // GETTERS Y SETTERS
  getId(): number | null {
    return this._userId;
  }

  setId(id: number): void {
    this._userId = id;
  }

  getRole(): number | null {
    return this._userRole;
  }

  setRole(role: number): void {
    this._userRole = role;
  }

  getData(): any {
    return this._userData;
  }

  setData(data: any): void {
    this._userData = data;
  }

  // TOGGLE NIGHT MODE
  toggleModeLS(): void {
    const current = localStorage.getItem("us_st")?.toLowerCase() === "true";
    localStorage.setItem("us_st", String(!current));
  }

  // HEADERS
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("pucoToken") || ""}`,
    });
  }

  // ROLES API
  getAllRoles(): Observable<any> {
    return this.http.get(`${this.URL_BACKEND}/api/role/list`, {
      headers: this.getHeaders(),
    });
  }

  getPaginationRoles(page: number, limit: number): Observable<any> {
    return this.http.get(
      `${this.URL_BACKEND}/api/role/list?page=${page}&limit=${limit}`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  postRole(body: any): Observable<any> {
    return this.http.post(`${this.URL_BACKEND}/api/role/create`, body, {
      headers: this.getHeaders(),
    });
  }

  disableRole(body: any, id: number): Observable<any> {
    return this.http.put(`${this.URL_BACKEND}/api/role/disable/${id}`, body, {
      headers: this.getHeaders(),
    });
  }

  putRole(body: any, id: number): Observable<any> {
    return this.http.put(`${this.URL_BACKEND}/api/role/update/${id}`, body, {
      headers: this.getHeaders(),
    });
  }
}
