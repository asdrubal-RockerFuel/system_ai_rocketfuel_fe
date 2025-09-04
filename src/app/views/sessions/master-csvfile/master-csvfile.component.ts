import { Component, OnDestroy } from "@angular/core";
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import {
  NgxFileDropModule,
  FileSystemFileEntry,
  NgxFileDropEntry,
} from "ngx-file-drop";
import { CsvUploadService, ApiResponse } from "./csv-upload.service";

@Component({
  selector: "app-master-csvfile",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxFileDropModule],
  templateUrl: "./master-csvfile.component.html",
  styleUrls: ["./master-csvfile.component.scss"],
})
export class MasterCSVFileComponent implements OnDestroy {
  form: UntypedFormGroup;
  selectedFile: File | null = null;
  isDragging = false; // ← indicador de drag
  isLoading = false;

  downloadUrl: string | null = null;
  processedFileName: string | null = null;

  constructor(
    private fb: UntypedFormBuilder,
    private csvUploadService: CsvUploadService
  ) {
    this.form = this.fb.group({
      option: [null, Validators.required],
    });
  }

  onSelectFile(event: NgxFileDropEntry[]): void {
    const fileEntry = event[0].fileEntry as FileSystemFileEntry;
    fileEntry.file((file: File) => {
      this.selectedFile = file;
      this.revokeDownloadUrl();
    });
  }

  // 🔹 Nuevo: se dispara cuando el archivo entra en la zona
  fileOver(event: any) {
    this.isDragging = true;
  }

  // 🔹 Nuevo: se dispara cuando el archivo sale de la zona
  fileLeave(event: any) {
    this.isDragging = false;
  }

  onSubmit(): void {
    if (!this.form.valid || !this.selectedFile) {
      alert("Debes seleccionar un archivo y una opción.");
      return;
    }
    this.isLoading = true;
    this.revokeDownloadUrl();

    const formData = new FormData();
    formData.append("file", this.selectedFile);
    formData.append("option", this.form.value.option);

    this.csvUploadService.uploadFile(formData).subscribe({
      next: (response: ApiResponse) => {
        const base64String = response.data.base64;
        const fileBlob = this.base64ToBlob(base64String, "text/csv");

        this.downloadUrl = window.URL.createObjectURL(fileBlob);
        this.processedFileName = `resultado-${
          this.selectedFile?.name || "procesado.csv"
        }`;

        this.isLoading = false;
        alert("Archivo procesado con éxito. Ya puedes descargarlo.");
      },
      error: (error) => {
        console.error("Error al subir el archivo:", error);
        alert("Hubo un error al procesar el archivo.");
        this.isLoading = false;
      },
    });
  }

  private base64ToBlob(base64Data: string, contentType = ""): Blob {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    return new Blob([new Uint8Array(byteNumbers)], { type: contentType });
  }

  downloadFile(): void {
    if (!this.downloadUrl || !this.processedFileName) return;

    const a = document.createElement("a");
    a.href = this.downloadUrl;
    a.download = this.processedFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  private revokeDownloadUrl(): void {
    if (this.downloadUrl) {
      window.URL.revokeObjectURL(this.downloadUrl);
      this.downloadUrl = null;
      this.processedFileName = null;
    }
  }

  ngOnDestroy(): void {
    this.revokeDownloadUrl();
  }
}
