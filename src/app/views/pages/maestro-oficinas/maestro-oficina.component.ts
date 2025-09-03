import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PaginationService } from "ngx-pagination";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/shared/services/auth.service";
import { officeService } from "src/app/shared/services/oficina.service";
import { genericGet } from "src/app/shared/utils/genericGet.model";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-maestro-oficina",
  templateUrl: "./maestro-oficina.component.html",
  styleUrls: ["./maestro-oficina.component.scss"],
})
export class MaestroOficinaComponent implements OnInit {
  constructor(
    private fb: UntypedFormBuilder,
    private toastr: ToastrService,
    private paginationService: PaginationService,
    private _sAuth: AuthService,
    private modalService: NgbModal,
    private _sOficina: officeService
  ) {
    this.rol = atob(localStorage.getItem("rol"));
  }
  rol;
  myForm: UntypedFormGroup;
  ngOnInit(): void {
    this.buildForm();
    this.obtenerAdmin(1);
  }
  loadData;
  data: genericGet = {
    count: 0,
    page: 0,
    rows: [],
  };
  allUser;

  total$;

  count;
  pageSize = 1;
  qtyPerPage= 5;
  collectionSize = 0;

  cambiaPage($event) {
    console.log($event, "pagina");
    this.page = $event;
    this.obtenerAdmin($event);
  }

  obtenerAdmin(page) {
    this.loadData = true;
    this._sOficina.getoffice(page, this.qtyPerPage ).subscribe(
      (data: any) => {
        this.loadData = false;
        this.data = data;
        console.log("this", this.data);
        this.allUser = data.data.rows;
        this.total$ = this.allUser.length;
        let count: any = data.data.count;
        console.log(
          { totalEncontrado: this.total$, TotalOriginal: count },
          "arreglo"
        );
        this.collectionSize = Math.ceil(Number(count) / this.qtyPerPage);
        console.log(this.collectionSize);
        
      },
      (error) => {
        /*   if (error.status === 401) {
          this._sAuth.signout();
        } */ this.loadData = false;
        /*   this.toastr.error(
          "Error al obtener las oficinas.",
          `${error.error.errors[0].msg}`,
          {
            timeOut: environment.timeOutmessage,
            closeButton: true,
            progressBar: true,
          }
        ); */
        // console.log(error);
      }
    );
  }

  buildForm(): void {
    this.myForm = this.fb.group({
      name: ["", Validators.required],
      country_name: ["", Validators.required],
      department_name: ["", Validators.required],
      city_name: ["", Validators.required],
      address: ["", Validators.required],
    });
  }

  eve;
  deleteInvoice(id, modal) {
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
          this._sOficina.habilitaroffice(this.rol, id.id, this.eve).subscribe(
            (resp) => {
              this.toastr.success(
                "Cambio realizado",
                "Se cambio el estado de la Categoría",
                {
                  timeOut: environment.timeOutmessage,
                  closeButton: true,
                  progressBar: true,
                }
              );
              this.obtenerAdmin(this.page);
            },
            (error) => {
              /*   if (error.status === 401) {
                this._sAuth.signout();
              }
              this.toastr.error(
                "Error al cambiar estado de la Categoría.",
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

        (reason) => {}
      );
  }

  openCategoriasAdd(content) {
    this.myForm.reset();
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", size: "md" })
      .result.then(
        (result) => {
          console.log(result);
        },
        (reason) => {
          console.log("Err!", reason);
        }
      );
  }
  openEditModal(row, content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", size: "md" })
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
      this.myForm.get("name").value == "" ||
      this.myForm.get("name").value == null ||
      this.myForm.get("name").value == undefined
    ) {
      this.toastr.error(
        "¡Necesita ingresar un nombre para la oficina!",
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
      this.myForm.get("country_name").value == "" ||
      this.myForm.get("country_name").value == null ||
      this.myForm.get("country_name").value == undefined
    ) {
      this.toastr.error("¡Necesita ingresar un país!", "Cambio no realizado", {
        timeOut: environment.timeOutmessage,
        closeButton: true,
        progressBar: true,
      });
      return;
    }

    if (
      this.myForm.get("department_name").value == "" ||
      this.myForm.get("department_name").value == null ||
      this.myForm.get("department_name").value == undefined
    ) {
      this.toastr.error(
        "¡Necesita ingresar un deparamento!",
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
      this.myForm.get("city_name").value == "" ||
      this.myForm.get("city_name").value == null ||
      this.myForm.get("city_name").value == undefined
    ) {
      this.toastr.error(
        "¡Necesita ingresar una ciudad!",
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
      this.myForm.get("address").value == "" ||
      this.myForm.get("address").value == null ||
      this.myForm.get("address").value == undefined
    ) {
      this.toastr.error(
        "¡Necesita ingresar una dirección!",
        "Cambio no realizado",
        {
          timeOut: environment.timeOutmessage,
          closeButton: true,
          progressBar: true,
        }
      );
      return;
    } else {
      return true;
    }
  }

  agregar() {
    var validar = this.validarContratacion();

    if (validar) {
      this.workback = true;
      const data = {
        ...this.myForm.value, // Copia todas las propiedades existentes en myForm
      };

      this._sOficina.createoffice(this.rol, data).subscribe(
        (resp) => {
          /*  this.workback = false; */
          this.modalService.dismissAll();
          this.toastr.success("¡Oficina agregada!", "Cambio realizado", {
            timeOut: environment.timeOutmessage,
            closeButton: true,
            progressBar: true,
          });
          this.workback = false;

          this.myForm.reset();
          this.obtenerAdmin(this.page);
        },
        (error) => {
          this.workback = false;

          /*  if (error.status === 401) {
            this._sAuth.signout();
          }
          this.toastr.error(
            "Error al crear la oficina.",
            `Vuelva a intentarlo`,
            {
              timeOut: environment.timeOutmessage,
              closeButton: true,
              progressBar: true,
            }
          ); */
        }
      );
    } else {
      return true;
    }
  }
  cerrarModal() {
    this.modalService.dismissAll();
  }

  DatosUpdate;
  DatosOficina;
  confirmResut;

  workback;
  editarArticuloAdmin() {
    let de = {
      id: null,
      name: null,
      country_name: null,
      department_name: null,
      city_name: null,
      address: null,
    };

    if (this.DatosUpdate !== JSON.stringify(this.DatosOficina)) {
      (de.id = this.DatosOficina.id),
        (de.name = this.DatosOficina.name),
        (de.country_name = this.DatosOficina.country_name),
        (de.department_name = this.DatosOficina.department_name),
        (de.city_name = this.DatosOficina.city_name),
        (de.address = this.DatosOficina.address),
        (this.workback = true);
      console.log("de", de);
      // console.log(this.DatosTips);
      this._sOficina.updateoffice(this.rol, de).subscribe(
        (resp) => {
          this.workback = false;
          this.modalService.dismissAll();
          this.toastr.success("!Categoría actualizada!", "Cambio realizado", {
            timeOut: environment.timeOutmessage,
            closeButton: true,
            progressBar: true,
          });
          this.myForm.reset();
          this.obtenerAdmin(this.page);
        },
        (error) => {
          this.workback = false;
          /*   if (error.status === 401) {
            this._sAuth.signout();
          }
          this.workback = false;
          this.toastr.error(
            "Error al editar la Categoría.",
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

  confirm(index, row, content) {
    this.editMode = true;

    this.DatosUpdate = JSON.stringify(row);
    this.DatosOficina = JSON.parse(JSON.stringify(row));
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

  ombreImg;
  nombreImg;
  image;
  cambioImagen1 = false;
  editMode = false;
  incluirImagen = false;

  cancelarCambioImg() {
    this.cambioImagen1 = false;
    // this.image = null;
    this.image = this.DatosOficina.path;
    this.nombreImg = this.DatosOficina.key;
  }

  changeListener($event): void {
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
