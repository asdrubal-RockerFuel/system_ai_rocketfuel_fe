import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PaginationService } from "ngx-pagination";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/shared/services/auth.service";
import { setsService } from "src/app/shared/services/sets.service";
import { genericGet } from "src/app/shared/utils/genericGet.model";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-maestro-productos",
  templateUrl: "./maestro-productos.component.html",
  styleUrls: ["./maestro-productos.component.scss"],
})
export class MaestroProductosComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private paginationService: PaginationService,
    private _sAuth: AuthService,
    private modalService: NgbModal,
    private _sSets: setsService
  ) {
    this.rol = atob(localStorage.getItem("rol"));
  }
  rol;
  myForm: FormGroup;
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

  count = "12";
  pageSize = 1;
  collectionSize = 0;

  cambiaPage($event) {
    console.log($event, "pagina");
    this.page = $event;
    this.obtenerAdmin($event);
  }

  obtenerAdmin(page) {
    this.loadData = true;
    this._sSets.getSets(this.rol, page).subscribe(
      (data: genericGet) => {
        this.loadData = false;
        this.data = data;
        this.allUser = data.rows;
        this.total$ = this.allUser.length;
        let count: any = data.count;
        console.log(
          { totalEncontrado: this.total$, TotalOriginal: count },
          "arreglo"
        );
        this.collectionSize = Number(count) / 12;
      },
      (error) => {
        if (error.status === 401) {
          this._sAuth.signout();
        }
        this.toastr.error(
          "Error al obtener los Articulo.",
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
      name: ["", Validators.required],
      description: ["", Validators.required],
      price: ["", Validators.required],
      currency: ["", Validators.required],
      brand: ["", Validators.required],
      technical_specification: ["", Validators.required],
    });
  }

  eve;
  deleteInvoice(id, modal) {
    console.log(id);

    if (id.state == false) {
      this.eve = true;
    } else {
      this.eve = false;
    }

    this.modalService
      .open(modal, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {
          this._sSets.habilitarSets(this.rol, id.id, this.eve).subscribe(
            (resp) => {
              this.toastr.success(
                "Cambio realizado",
                "Se cambio el estado del Articulo",
                {
                  timeOut: environment.timeOutmessage,
                  closeButton: true,
                  progressBar: true,
                }
              );
              this.obtenerAdmin(this.page);
            },
            (error) => {
              if (error.status === 401) {
                this._sAuth.signout();
              }
              this.toastr.error(
                "Error al cambiar estado del Articulo.",
                `${error.error.errors[0].msg}`,
                {
                  timeOut: environment.timeOutmessage,
                  closeButton: true,
                  progressBar: true,
                }
              );
            }
          );
        },

        (reason) => {}
      );
  }

  resetImage() {
    this.nombreImg = null;
    this.image = null;
    this.incluirImagen = false;
  }

  openSetsAdd(content) {
    this.resetImage();
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
        "¡Necesita ingresar un nombre!",
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
      this.myForm.get("description").value == "" ||
      this.myForm.get("description").value == null ||
      this.myForm.get("description").value == undefined
    ) {
      this.toastr.error(
        "¡Necesita ingresar una descripciòn!",
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
      this.myForm.get("price").value == "" ||
      this.myForm.get("price").value == null ||
      this.myForm.get("price").value == undefined
    ) {
      this.toastr.error(
        "¡Necesita ingresar un precio!",
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
      this.myForm.get("currency").value == "" ||
      this.myForm.get("currency").value == null ||
      this.myForm.get("currency").value == undefined
    ) {
      this.toastr.error(
        "¡Necesita seleccionar una moneda!",
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
      this.myForm.get("brand").value == "" ||
      this.myForm.get("brand").value == null ||
      this.myForm.get("brand").value == undefined
    ) {
      this.toastr.error(
        "¡Necesita ingresar una marca!",
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
      this.myForm.get("technical_specification").value == "" ||
      this.myForm.get("technical_specification").value == null ||
      this.myForm.get("technical_specification").value == undefined
    ) {
      this.toastr.error(
        "¡Necesita ingresar la especificaciòn tècnica!",
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
      const data = {
        ...this.myForm.value, // Copia todas las propiedades existentes en myForm
        image: null, // Agrega la propiedad 'image' con el valor deseado
      };

      if (this.incluirImagen) {
        if (this.image !== null) {
          data.image = this.image;
        } else {
          this.toastr.info(
            "No se realizo la acción.",
            `Debe seleccionar una imagen.`,
            {
              timeOut: environment.timeOutmessage,
              closeButton: true,
              progressBar: true,
            }
          );
          return;
        }
      }

      this._sSets.createSets(this.rol, data).subscribe(
        (resp) => {
          /*  this.workback = false; */
          this.modalService.dismissAll();
          this.toastr.success("¡Articulo agregado!", "Cambio realizado", {
            timeOut: environment.timeOutmessage,
            closeButton: true,
            progressBar: true,
          });
          this.image = null;
          this.myForm.reset();
          this.obtenerAdmin(this.page);
        },
        (error) => {
          if (error.status === 401) {
            this._sAuth.signout();
          }
          /*   this.workback = false; */
          this.toastr.error(
            "Error al crear el Articulo.",
            `Vuelva a intentarlo`,
            {
              timeOut: environment.timeOutmessage,
              closeButton: true,
              progressBar: true,
            }
          );
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
  DatosSets;
  confirmResut;

  workback;
  editarArticuloAdmin() {
    let cambioImg = false;

    let de = {
      id: null,
      name: null,
      description: null,
      price: null,
      currency: null,
      brand: null,
      technical_specification: null,
      image: null,
    };

    if (this.cambioImagen1) {
      cambioImg = true;
      if (this.image) {
        if (this.image.startsWith("http")) {
          delete de.image;
        } else {
          cambioImg = true;
          de.image = this.image;
        }
      } else {
        delete de.image;
      }
    }
    console.log("data", de);

    if (this.DatosUpdate !== JSON.stringify(this.DatosSets) || cambioImg) {
      (de.id = this.DatosSets.id),
        (de.name = this.DatosSets.name),
        (de.description = this.DatosSets.description),
        (de.price = this.DatosSets.price),
        (de.currency = this.DatosSets.currency),
        (de.brand = this.DatosSets.brand),
        (de.technical_specification = this.DatosSets.technical_specification),
        (this.workback = true);
      console.log("de", de);
      // console.log(this.DatosTips);
      this._sSets.updateSets(this.rol, de).subscribe(
        (resp) => {
          this.workback = false;
          this.modalService.dismissAll();
          this.toastr.success("¡Articulo actualizado!", "Cambio realizado", {
            timeOut: environment.timeOutmessage,
            closeButton: true,
            progressBar: true,
          });
          this.myForm.reset();
          this.obtenerAdmin(this.page);
        },
        (error) => {
          if (error.status === 401) {
            this._sAuth.signout();
          }
          this.workback = false;
          this.toastr.error(
            "Error al editar el Articulo.",
            `${error.error.errors[0].msg}`,
            {
              timeOut: environment.timeOutmessage,
              closeButton: true,
              progressBar: true,
            }
          );
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
    this.resetImage();
    this.editMode = true;
    if (row.path !== null) {
      this.incluirImagen = true;
      this.image = row.path;
      this.nombreImg = row.key;
    }

    this.DatosUpdate = JSON.stringify(row);
    this.DatosSets = JSON.parse(JSON.stringify(row));
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
    this.image = this.DatosSets.path;
    this.nombreImg = this.DatosSets.key;
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
