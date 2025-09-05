import {
  Component,
  OnDestroy,
  ViewChild,
  ElementRef,
  OnInit,
} from "@angular/core";
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CsvUploadService } from "../../../shared/services/csv-upload.service";
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
import { ApiResponse } from "../../../shared/interfaces/ApiResponse.interface";

@Component({
  selector: "app-master-csvfile",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: "./master-csvfile.html",
  styleUrls: ["./master-csvfile.scss"],
})
export class MasterCSVFileComponent implements OnInit, OnDestroy {
  @ViewChild("fileInput") fileInput!: ElementRef<HTMLInputElement>;

  form: UntypedFormGroup;
  selectedFile: File | null = null;
  isDragging = false;
  isLoading = false;
  downloadUrl: string | null = null;
  processedFileName: string | null = null;

  systemPrompt: string = ""; // Último prompt
  originalPrompt: string = ""; // Prompt tal como viene del backend

  constructor(
    private fb: UntypedFormBuilder,
    private csvUploadService: CsvUploadService,
    private library: FaIconLibrary
  ) {
    // Agregar íconos
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
      // productService: [""],
      valueProp: [""],
      goal: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadLastPrompt();

    this.form.valueChanges.subscribe(() => {
      this.updatePromptPreview();
    });
  }

  /** 🔹 Cargar último prompt del backend */
  private loadLastPrompt(): void {
    this.csvUploadService.getLastPrompt().subscribe({
      next: (response: ApiResponse) => {
        this.originalPrompt = response?.data?.content ?? "";
        this.updatePromptPreview();
      },
      error: (err) => {
        console.error("Error loading last prompt:", err);
        this.originalPrompt = "Failed to load the last prompt.";
        this.updatePromptPreview();
      },
    });
  }

  private updatePromptPreview(): void {
    if (!this.originalPrompt) return;

    const formValues = this.form.value;

    this.systemPrompt = this.originalPrompt
      .replace(
        "{{{Company Name}}}",
        `<span class="highlight bg-primary bg-opacity-25 text-dark">${
          formValues.companyName || "Company Name"
        }</span>`
      )
      .replace(
        "{{{Website}}}",
        `<span class="highlight bg-success bg-opacity-25 text-dark">${
          formValues.website || "Website"
        }</span>`
      )
      .replace(
        "{{{Product or Service Offered}}}",
        `<span class="highlight bg-warning bg-opacity-25 text-dark">${
          formValues.productService || "Product/Service"
        }</span>`
      )
      .replace(
        "{{{Value Proposition}}}",
        `<span class="highlight bg-danger bg-opacity-25 text-dark">${
          formValues.valueProp || "Value Proposition"
        }</span>`
      )
      .replace(
        "{{{Goal}}}",
        `<span class="highlight bg-info bg-opacity-25 text-dark">${
          formValues.goal || "Goal"
        }</span>`
      );
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
    if (files?.length) this.setSelectedFile(files[0]);
  }

  /** 🔹 Input File Selector */
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) this.setSelectedFile(input.files[0]);
  }

  triggerFileSelector() {
    this.fileInput.nativeElement.click();
  }
  removeFile() {
    this.setSelectedFile(null);
  }

  /** 🔹 Upload y descarga */
  onSubmit(): void {
    if (!this.form.valid || !this.selectedFile) return;
    // if (!this.selectedFile) return;

    this.isLoading = true;
    this.revokeDownloadUrl();

    const formData = new FormData();
    formData.append("file", this.selectedFile);
    formData.append("option", "v3");
    formData.append("companyName", this.form.value.companyName);
    formData.append("website", this.form.value.website || "");
    formData.append("valueProp", this.form.value.valueProp || "");
    formData.append("goal", this.form.value.goal || "");

    this.csvUploadService.uploadFile(formData).subscribe({
      next: (response: ApiResponse) => {
        const base64String = response.data?.base64;
        if (!base64String) return;

        const fileBlob = this.base64ToBlob(base64String, "text/csv");
        this.downloadUrl = window.URL.createObjectURL(fileBlob);
        this.processedFileName = `resultado-${
          this.selectedFile?.name || "procesado.csv"
        }`;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error al subir archivo:", err);
        this.isLoading = false;
      },
    });
  }

  /** 🔹 Utilidades */
  private setSelectedFile(file: File | null) {
    this.selectedFile = file;
    this.revokeDownloadUrl();
    if (!file && this.fileInput?.nativeElement)
      this.fileInput.nativeElement.value = "";
  }

  private revokeDownloadUrl(): void {
    if (this.downloadUrl) {
      window.URL.revokeObjectURL(this.downloadUrl);
      this.downloadUrl = null;
      this.processedFileName = null;
    }
  }

  private base64ToBlob(base64Data: string, contentType = ""): Blob {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length)
      .fill(0)
      .map((_, i) => byteCharacters.charCodeAt(i));
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

  ngOnDestroy(): void {
    this.revokeDownloadUrl();
  }
}
