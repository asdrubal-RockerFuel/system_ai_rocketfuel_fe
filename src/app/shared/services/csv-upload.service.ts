import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

// NUEVO: Interfaz para definir la estructura de la respuesta de la API
export interface ApiResponse {
  status: boolean;
  message: string;
  code: number;
  data: {
    base64: string;
    csvFilePath: string;
    propmt_file_path: string;
  };
}

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
}
