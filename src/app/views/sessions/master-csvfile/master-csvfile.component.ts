import { Component, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiResponse, CsvUploadService } from "./csv-upload.service";
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';

@Component({
    selector: "app-master-csvfile",
    templateUrl: "./master-csvfile.component.html",
    styleUrls: ["./master-csvfile.component.scss"],
})
export class MasterCSVFileComponent implements OnDestroy {
    form: FormGroup;
    selectedFile: File | null = null;
    isLoading: boolean = false;

    // --- NUEVO: Propiedades para almacenar el resultado ---
    downloadUrl: string | null = null;
    processedFileName: string | null = null;

    constructor(
        private fb: FormBuilder,
        private csvUploadService: CsvUploadService
    ) {
        this.form = this.fb.group({
            option: [null, Validators.required]
        });
    }

    onSelectFile(event: NgxDropzoneChangeEvent): void {
        this.selectedFile = event.addedFiles[0] ?? null;
        // Si el usuario cambia el archivo, reseteamos el enlace de descarga anterior
        this.revokeDownloadUrl();
    }

    onSubmit(): void {
        if (!this.form.valid || !this.selectedFile) {
            alert('Debes seleccionar un archivo y una opción.');
            return;
        }
        this.isLoading = true;
        this.revokeDownloadUrl();

        const formData = new FormData();
        formData.append('file', this.selectedFile);
        formData.append('option', this.form.value.option);

        this.csvUploadService.uploadFile(formData).subscribe({
            // MODIFICADO: Ahora recibimos 'response' de tipo ApiResponse
            next: (response: ApiResponse) => {
                // 1. Extraemos el string Base64 de la respuesta JSON
                const base64String = response.data.base64;

                // 2. Convertimos el string Base64 a un Blob
                const fileBlob = this.base64ToBlob(base64String, 'text/csv');

                // 3. El resto de la lógica es la misma que ya tenías
                this.downloadUrl = window.URL.createObjectURL(fileBlob);
                this.processedFileName = `resultado-${this.selectedFile?.name || 'procesado.csv'}`;

                this.isLoading = false;
                alert('Archivo procesado con éxito. Ya puedes descargarlo.');
            },
            error: (error) => {
                console.error('Error al subir el archivo:', error);
                alert('Hubo un error al procesar el archivo.');
                this.isLoading = false;
            }
        });
    }

    /**
     * NUEVO: Función auxiliar para convertir un string Base64 a un Blob.
     * @param base64Data El string Base64 sin el prefijo "data:".
     * @param contentType El tipo de contenido del archivo (ej. 'text/csv', 'image/png').
     */
    private base64ToBlob(base64Data: string, contentType: string = ''): Blob {
        // Decodifica el string Base64 a un string binario
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        // Crea un array de bytes de 8 bits sin signo
        const byteArray = new Uint8Array(byteNumbers);
        // Devuelve el Blob final
        return new Blob([byteArray], { type: contentType });
    }

    // --- NUEVO: Método para el botón de descarga ---
    downloadFile(): void {
        if (!this.downloadUrl || !this.processedFileName) {
            return;
        }
        // Creamos un enlace temporal y lo clickeamos para iniciar la descarga
        const a = document.createElement('a');
        a.href = this.downloadUrl;
        a.download = this.processedFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    // --- BUENA PRÁCTICA: Limpiar la URL del Blob para evitar memory leaks ---
    private revokeDownloadUrl(): void {
        if (this.downloadUrl) {
            window.URL.revokeObjectURL(this.downloadUrl);
            this.downloadUrl = null;
            this.processedFileName = null;
        }
    }

    ngOnDestroy(): void {
        // Asegurarnos de limpiar la URL cuando el componente se destruye
        this.revokeDownloadUrl();
    }
}