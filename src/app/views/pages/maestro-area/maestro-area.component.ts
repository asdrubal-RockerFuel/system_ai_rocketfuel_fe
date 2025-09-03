import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PaginationService } from "ngx-pagination";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../../../shared/services/auth.service";
import { areaService } from "../../../shared/services/areas.service";
import { officeService } from "../../../shared/services/oficina.service";
import { genericGet } from "../../../shared/utils/genericGet.model";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "app-maestro-area",
  templateUrl: "./maestro-area.component.html",
  styleUrls: ["./maestro-area.component.scss"],
  standalone: true,
  imports: [areaService, AuthService, officeService]
})
export class MaestroAreaComponent implements OnInit {
  constructor(
    private fb: UntypedFormBuilder,
    private toastr: ToastrService,
    private paginationService: PaginationService,
    private _sAuth: AuthService,
    private modalService: NgbModal,
    private _sArea: areaService,
    private _sOficina: officeService
  ) {
    this.rol = atob(localStorage?.getItem("rol") ?? "");
  }
  rol;
  myForm: UntypedFormGroup | undefined;
  ngOnInit(): void {
    this.buildForm();
    this.obtenerOficinas();
    this.obtenerAdmin(1);
  }
  loadData: boolean = false;
  data: genericGet = {
    count: 0,
    page: 0,
    rows: [],
  };
  allUser: string | any[] | undefined;

  total$: any;

  count: any;
  qtyPage = 5;
  pageSize = 1;
  collectionSize = 0;

  cambiaPage($event: number) {
    console.log($event, "pagina");
    this.page = $event;
    this.obtenerAdmin($event);
  }

  arrOficina = [];
  obtenerOficinas() {
    this._sOficina.getofficeoutpagination().subscribe((data: any) => {
      console.log(data, "s");
      this.arrOficina = data.data.rows;
    });
  }

  obtenerAdmin(page: number) {
    this.loadData = true;
    this._sArea.getarea(page, this.qtyPage).subscribe(
      (data: any) => {
        this.loadData = false;
        this.data = data.data;
        this.allUser = data.data.rows;
        this.total$ = this.allUser?.length ?? 0;
        let count: any = data.data.count;
        console.log(
          { totalEncontrado: this.total$, TotalOriginal: count },
          "arreglo"
        );
        this.collectionSize = Number(count) / this.qtyPage;
      },
      (error) => {
        if (error.status === 401) {
          this._sAuth.signout();
        }
        this.toastr.error(
          "Error al obtener las Áreas.",
          `${error.error.errors[0].msg}`,
          {
            timeOut: environment.timeOutmessage,
            closeButton: true,
            progressBar: true,
          }
        );
        // console.log(error);
      }
    );
  }

  buildForm(): void {
    this.myForm = this.fb.group({
      office_id: ["", Validators.required],
      name: ["", Validators.required],
    });
  }

  eve: boolean = false;
  deleteInvoice(id: { status: boolean; id: any; }, modal: any) {
    console.log(id);

    if (id.status == false) {
      this.eve = true;
    } else {
      this.eve = false;
    }

    this.modalService
      .open(modal, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {
          this._sArea.habilitararea(this.rol, id.id, this.eve).subscribe(
            (resp) => {
              this.toastr.success(
                "Cambio realizado",
                "Se cambio el estado del Área",
                {
                  timeOut: environment.timeOutmessage,
                  closeButton: true,
                  progressBar: true,
                }
              );
              this.obtenerAdmin(this.page);
            },
            (error) => {
              /*  if (error.status === 401) {
                this._sAuth.signout();
              }
              this.toastr.error(
                "Error al cambiar estado del Área.",
                `${error.error.errors[0].msg}`,
                {
                  timeOut: environment.timeOutmessage,
                  closeButton: true,
                  progressBar: true,
                }
              ); */
            }
          );
        },

        (reason) => { }
      );
  }

  openCategoriasAdd(content: any) {
    this.myForm?.reset();

    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", size: "500px" })
      .result.then(
        (result) => {
          console.log(result);
        },
        (reason) => {
          console.log("Err!", reason);
        }
      );
  }
  openEditModal(row: any, content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", size: "500px" })
      .result.then(
        (result) => {
          console.log(result);
        },
        (reason) => {
          console.log("Err!", reason);
        }
      );
  }
  page = 1;

  validarContratacion() {
    if (
      this.myForm?.get("office_id")?.value == "" ||
      this.myForm?.get("office_id")?.value == null ||
      this.myForm?.get("office_id")?.value == undefined
    ) {
      this.toastr.error(
        "¡Necesita seleccionar una oficina!",
        "Cambio no realizado",
        {
          timeOut: environment.timeOutmessage,
          closeButton: true,
          progressBar: true,
        }
      );
      return;
    }

    if (
      this.myForm.get("name")?.value == "" ||
      this.myForm.get("name")?.value == null ||
      this.myForm.get("name")?.value == undefined
    ) {
      this.toastr.error("¡Necesita ingresar un Área!", "Cambio no realizado", {
        timeOut: environment.timeOutmessage,
        closeButton: true,
        progressBar: true,
      });
      return;
    } else {
      return true;
    }
  }

  agregar(): boolean | void {
    var validar = this.validarContratacion();

    if (validar) {
      this.workback = true;
      const data = {
        ...this.myForm?.value, // Copia todas las propiedades existentes en myForm
      };

      this._sArea.createarea(this.rol, data).subscribe(
        (resp) => {
          /*  this.workback = false; */
          this.modalService.dismissAll();
          this.toastr.success(
            "¡Área e Iniciativa agregado!",
            "Cambio realizado",
            {
              timeOut: environment.timeOutmessage,
              closeButton: true,
              progressBar: true,
            }
          );
          this.workback = false;

          this.myForm?.reset();
          this.obtenerAdmin(this.page);
        },
        (error) => {
          this.workback = false;
        }
      );
    } else {
      return true;
    }
  }
  cerrarModal() {
    this.modalService.dismissAll();
  }

  DatosUpdate: string | undefined;
  DatosArea: { id: null; office_id: null; name: null; path: any; key: any; } | undefined;
  confirmResut: string | undefined;

  workback: boolean = false;
  editarArticuloAdmin() {
    let de = {
      id: null,
      office_id: null,
      name: null,
    };

    if (this.DatosUpdate !== JSON.stringify(this.DatosArea)) {
      (de.id = this.DatosArea?.id || null),
        (de.office_id = this.DatosArea?.office_id || null),
        (de.name = this.DatosArea?.name || null),
        (this.workback = true);
      console.log("de", de);
      // console.log(this.DatosTips);
      this._sArea.updatearea(this.rol, de).subscribe(
        (resp) => {
          this.workback = false;
          this.modalService.dismissAll();
          this.toastr.success("!Área actualizada!", "Cambio realizado", {
            timeOut: environment.timeOutmessage,
            closeButton: true,
            progressBar: true,
          });
          this.myForm?.reset();
          this.obtenerAdmin(this.page);
        },
        (error) => {
          this.workback = false;
          /* if (error.status === 401) {
            this._sAuth.signout();
          }

          this.toastr.error(
            "Error al editar Área.",
            `${error.error.errors[0].msg}`,
            {
              timeOut: environment.timeOutmessage,
              closeButton: true,
              progressBar: true,
            }
          ); */
        }
      );
    } else {
      this.toastr.info("No se realizaron cambios.", "", {
        timeOut: environment.timeOutmessage,
        closeButton: true,
        progressBar: true,
      });
    }
  }

  confirm(index: any, row: any, content: any) {
    this.editMode = true;

    this.DatosUpdate = JSON.stringify(row);
    this.DatosArea = JSON.parse(JSON.stringify(row));
    console.log("DatosArea", this.DatosArea);
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {
          this.confirmResut = `Closed with: ${result}`;
        },
        (reason) => {
          this.confirmResut = `Dismissed with: ${reason}`;
        }
      );
  }

  ombreImg: any;
  nombreImg: any;
  image: string | ArrayBuffer | null | undefined;
  cambioImagen1 = false;
  editMode = false;
  incluirImagen = false;

  cancelarCambioImg() {
    this.cambioImagen1 = false;
    // this.image = null;
    this.image = this.DatosArea?.path;
    this.nombreImg = this.DatosArea?.key;
  }

  changeListener($event: { target: any; }): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var mimeType1 = file.type;
    if (mimeType1.match(/image\/*/) == null) {
      this.toastr.info(
        "Debe seleccionar solo imágenes.",
        "No se cambio la imagen.",
        {
          timeOut: environment.timeOutmessage,
          closeButton: true,
          progressBar: true,
        }
      );
      return;
    }
    if (inputValue.files[0].name.length < 100) {
      this.nombreImg = inputValue.files[0].name;
    } else {
      this.toastr.info(
        "El nombre del archivo es muy largo.",
        "Acorte el nombre de la imagen.",
        {
          timeOut: environment.timeOutmessage,
          closeButton: true,
          progressBar: true,
        }
      );
      return;
    }

    var myReader1: FileReader = new FileReader();

    myReader1.onloadend = (e) => {
      // console.log('MyReader ', myReader1);
      // console.log('MyReader res ', myReader1.result);
      this.image = myReader1.result;
      if (this.editMode) {
        this.cambioImagen1 = true;
      }
    };
    myReader1.readAsDataURL(file);
  }
}
