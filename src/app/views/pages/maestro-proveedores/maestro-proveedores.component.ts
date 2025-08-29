import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PaginationService } from "ngx-pagination";
import { ToastrService } from "ngx-toastr";
import { areaService } from "src/app/shared/services/areas.service";
import { AuthService } from "src/app/shared/services/auth.service";
import { officeService } from "src/app/shared/services/oficina.service";
import { proveedorService } from "src/app/shared/services/proveedor.service";
import { RolService } from "src/app/shared/services/rol.service";
import { genericGet } from "src/app/shared/utils/genericGet.model";
import { environment } from "src/environments/environment";


@Component({
  selector: 'app-maestro-proveedores',
  templateUrl: './maestro-proveedores.component.html',
  styleUrls: ['./maestro-proveedores.component.scss']
})
export class MaestroProveedoresComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private paginationService: PaginationService,
    private _sAuth: AuthService,
    private modalService: NgbModal,
    private _sArea: areaService,
    private _sRol: RolService,
    private router: Router,
    private s_proveedor: proveedorService,
    private _sOficina: officeService
  ) {
    this.rol = atob(localStorage.getItem("rol"));
  }
  rol;
  id;
  myForm: FormGroup;
  ngOnInit(): void {
    this.buildForm();
    this.listRoles(1);
    /*  this.obtenerAdmin(1); */
  }
  loadData;
  data: genericGet = {
    count: 0,
    page: 0,
    rows: [],
  };
  allUser = [
  //   {
  //     id: 1,
  //     rol: "Gestor",
  //     description: "Lorem Ipsu",
  //     status: 1,
  //   },
  //   {
  //     id: 2,
  //     rol: "Asistente",
  //     description: "Lorem Ipsu",
  //     status: 1,
  //   },
  //   {
  //     id: 3,
  //     rol: "Especialista",
  //     description: "Lorem Ipsu",
  //     status: 1,
  //   },
  ];

  total$;

  count;
  qtyPage= 5;
  pageSize = 1;
  collectionSize = 0;

  cambiaPage($event) {
    console.log($event, "pagina");
    this.page = $event;
    this.listRoles($event);
  }

  arrOficina = [];
  listRoles(page) {
    this.s_proveedor.getListProveedor(page, this.qtyPage).subscribe(
      (res)=> {
        console.log('listar proveedores', res);
        this.loadData = false;
        this.data.rows = res.data.rows;
        this.allUser = res.data.rows;
        this.total$ = res.data.count;
        let count: any = res.data.count;
  
        this.collectionSize = Number(count) / this.qtyPage;
  
        console.log(this.allUser, "u");
      }
    )

    // this._sRol.getPaginationRoles(page, this.qtyPage).subscribe((res: any) => {
      
    //   this.loadData = false;
    //   this.data.rows = res.data.rows;
    //   this.allUser = res.data.rows;
    //   this.total$ = res.data.count;
    //   let count: any = res.data.count;

    //   this.collectionSize = Number(count) / this.qtyPage;

    //   console.log(this.allUser, "u");
    // });
  }

  obtenerAdmin(page) {
    this.loadData = true;
    this._sArea.getarea(this.rol, page).subscribe(
      (data: any) => {
        this.loadData = false;
        this.data = data.data;
        this.allUser = data.data.rows;
        this.total$ = this.allUser.length;
        let count: any = data.data.count;
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
      name: ["", Validators.required],
      description: ["", Validators.required],
    });
  }

  eve;
  rolNameModal: string;
  deleteInvoice(row, modal) {
    console.log(row);
    this.rolNameModal =  row.business_name;
    if (row.status == 0) {
      this.eve = true;
    } else {
      this.eve = false;
    }

    this.modalService
      .open(modal, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {
          // const body = {
          //   status: this.eve
          // }
          this.s_proveedor.disableProveedor(row.id, this.eve ).subscribe(
            (resp) => {
              this.toastr.success(
                "Cambio realizado",
                "Se cambio el estado del Proveedor",
                {
                  timeOut: environment.timeOutmessage,
                  closeButton: true,
                  progressBar: true,
                }
              );
              this.cambiaPage(1);
            },
            (error) => {
              if (error.status === 401) {
                this._sAuth.signout();
              }
              this.toastr.error(
                "Error al cambiar estado del Proveedor.",
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

  openCategoriasAdd(content) {
    this.myForm.reset();
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", size: "500px", centered: true})
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
      this.myForm.get("name").value == "" ||
      this.myForm.get("name").value == null ||
      this.myForm.get("name").value == undefined
    ) {
      this.toastr.error("¡Necesita ingresar un nombre!", "Cambio no realizado", {
        timeOut: environment.timeOutmessage,
        closeButton: true,
        progressBar: true,
      });
      return;
    } 
    
    
    if (
      this.myForm.get("description").value == "" ||
      this.myForm.get("description").value == null ||
      this.myForm.get("description").value == undefined
    ) {
      this.toastr.error(
        "¡Necesita colocar una descripción!",
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

      this._sRol.postRole(data).subscribe(
        (resp) => {
          this.workback = false;
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

          this.myForm.reset();
          this.cambiaPage(1);
        },
        (error) => {
          this.workback = false;

          if (error.status === 401) {
            this._sAuth.signout();
          }
          this.workback = false;
          this.toastr.error("Error al crear Área.", `Vuelva a intentarlo`, {
            timeOut: environment.timeOutmessage,
            closeButton: true,
            progressBar: true,
          });
        }
      );
    } else {
      this.workback = false;
      return true;
    }
  }
  cerrarModal() {
    this.modalService.dismissAll();
  }

  DatosUpdate;
  DatosArea;
  confirmResut;

  workback;
  editarArticuloAdmin() {
    let de = {
      id: null,
      office_id: null,
      name: null,
    };

    if (this.DatosUpdate !== JSON.stringify(this.DatosArea)) {
      (de.id = this.DatosArea.id),
        (de.office_id = this.DatosArea.offices[0].id),
        (de.name = this.DatosArea.name),
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
          this.myForm.reset();
          this.obtenerAdmin(this.page);
        },
        (error) => {
          if (error.status === 401) {
            this._sAuth.signout();
          }
          this.workback = false;
          this.toastr.error(
            "Error al editar Área.",
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

  DatosUser
  confirm(index, row, content) {
    this.editMode = true;

    this.DatosUpdate = JSON.stringify(row);
    this.DatosArea = JSON.parse(JSON.stringify(row));
    this.DatosUser = JSON.parse(JSON.stringify(row));
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

  ombreImg;
  nombreImg;
  image;
  cambioImagen1 = false;
  editMode = false;
  incluirImagen = false;

  cancelarCambioImg() {
    this.cambioImagen1 = false;
    // this.image = null;
    this.image = this.DatosArea.path;
    this.nombreImg = this.DatosArea.key;
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

  entraPermisos(path:string) {
    this.router.navigate([path]);
  }

  editarRol() {
    if (this.DatosUpdate === JSON.stringify(this.DatosUser)) {
      this.toastr.info("No se realizaron cambios.", "", {
        timeOut: environment.timeOutmessage,
        closeButton: true,
        progressBar: true,
      });
    } else {
      // console.log(this.DatosTips);
      this.editar();
      // this.workback = true;
    }
  }

  editar() {console.log(this.DatosUser);
    this.workback = true;
    const validar = this.validarEditar();
    const idRol = this.DatosUser.id;

    if (validar) {
      const body = {
        name: this.DatosUser.name,
        description: this.DatosUser.description
      }
      this._sRol.putRole(body, idRol).subscribe(
        (resp) => {
          this.workback = false;
          this.modalService.dismissAll();
          this.toastr.success("¡Usuario actualizado!", "Cambio realizado", {
            timeOut: environment.timeOutmessage,
            closeButton: true,
            progressBar: true,
          });
          this.cambiaPage(1);
        },
        (error) => {
          this.workback = false;
          this.toastr.error(
            "Error al editar el usuario.",
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
      this.workback = false;
      return true;
    }
  }


  validarEditar() {
    if (this.DatosUser.name && this.DatosUser.description) {
      return true;
    } else {
      this.toastr.error(
        "Error al editar el usuario.",
        "Nombre y Descripción son obligatorios.",
        {
          timeOut: environment.timeOutmessage,
          closeButton: true,
          progressBar: true,
        }
      );
      return false;
    }
  }
}
