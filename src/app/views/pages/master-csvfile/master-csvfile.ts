import { Component, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import {
  CsvUploadService,
  ApiResponse,
} from "../../../shared/guards/csv-upload";

import {
  FontAwesomeModule,
  FaIconLibrary,
} from "@fortawesome/angular-fontawesome";
import {
  faFileImage,
  faFilePdf,
  faFileWord,
  faFileExcel,
  faFileCsv,
  faFile,
  faCloudUploadAlt,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-master-csvfile",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: "./master-csvfile.html",
  styleUrls: ["./master-csvfile.scss"],
})
export class MasterCSVFileComponent implements OnDestroy {
  @ViewChild("fileInput") fileInput!: ElementRef<HTMLInputElement>;

  form: UntypedFormGroup;
  selectedFile: File | null = null;
  isDragging = false;
  isLoading = false;

  downloadUrl: string | null = null;
  processedFileName: string | null = null;

  constructor(
    private fb: UntypedFormBuilder,
    private csvUploadService: CsvUploadService,
    private library: FaIconLibrary
  ) {
    // Agrega todos los íconos que usarás en el componente
    library.addIcons(
      faFileImage,
      faFilePdf,
      faFileWord,
      faFileExcel,
      faFileCsv,
      faFile,
      faCloudUploadAlt
    );

    this.form = this.fb.group({
      option: [{ value: "v3", disabled: true }, Validators.required],
      companyName: ["", Validators.required],
      website: [""],
      productService: [""],
      valueProp: [""],
      goal: [null, Validators.required],
    });
  }

  /** 🔹 Drag & Drop Handlers */
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      this.revokeDownloadUrl();
    }
  }

  /** 🔹 Input File Selector */
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.revokeDownloadUrl();
    }
  }

  triggerFileSelector() {
    this.fileInput.nativeElement.click();
  }

  removeFile() {
    this.selectedFile = null;
    this.revokeDownloadUrl();
    this.fileInput.nativeElement.value = ""; // resetea el input
  }

  /** 🔹 Upload y descarga */
  onSubmit(): void {
    if (!this.form.valid || !this.selectedFile) {
      // Reemplaza alert con un modal
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
        // Reemplaza alert con un modal
      },
      error: (error) => {
        console.error("Error al subir el archivo:", error);
        // Reemplaza alert con un modal
        this.isLoading = false;
      },
    });
  }

  // Ahora esta función devuelve el objeto del ícono
  getFileIcon(file: File): IconDefinition {
    const ext = file.name.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "pdf":
        return faFilePdf;
      case "doc":
      case "docx":
        return faFileWord;
      case "xls":
      case "xlsx":
        return faFileExcel;
      case "csv":
        return faFileCsv;
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
        return faFileImage;
      default:
        return faFile;
    }
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
