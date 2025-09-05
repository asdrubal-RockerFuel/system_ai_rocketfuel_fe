import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiResponse } from "../interfaces/ApiResponse.interface";

@Injectable({
  providedIn: "root",
})
export class CsvUploadService {
  private apiUrl = environment.BACKEND_URL;

  constructor(private http: HttpClient) {}

  uploadFile(formData: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${this.apiUrl}/api/csv/process-csv`,
      formData,
      {
        reportProgress: true,
        observe: "body",
      }
    );
  }

  getLastPrompt(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/api/csv/last-prompt`);
  }
}
