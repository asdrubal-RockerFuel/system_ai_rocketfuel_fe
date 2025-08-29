import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/shared/services/auth.service";
import { userService } from "src/app/shared/services/user.service";
import { genericGet } from "src/app/shared/utils/genericGet.model";
import { environment } from "src/environments/environment";
import { FiltroService } from "src/app/shared/services/filtro.service";
import { companyService } from "src/app/shared/services/company.service";
import { NavigationService } from "src/app/shared/services/navigation.service";
import { officeService } from "src/app/shared/services/oficina.service";
import { RolService } from "src/app/shared/services/rol.service";
import { areaService } from "src/app/shared/services/areas.service";
import { programService } from "src/app/shared/services/program_iniciative.service";

@Component({
  selector: "app-maestro-usuario",
  templateUrl: "./maestro-usuario.component.html",
  styleUrls: ["./maestro-usuario.component.scss"],
})
export class MaestroUsuarioComponent implements OnInit {
  constructor(
    public rolService: RolService,
    public officeService: officeService,
    public navService: NavigationService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _sArea: areaService,
    private _sAuth: AuthService,
    private modalService: NgbModal,
    private _sUsuarios: userService,
    private filtroService: FiltroService,
    private _sCompany: companyService,
    private _sProgram: programService,
  ) {
    // this.navService.sidebarState.sidenavOpen = false;
    this.rol = atob(localStorage.getItem("rol"));
    this.actualUserId = Number(localStorage.getItem("idUser"));
    this.id_company = Number(localStorage.getItem("empresa"));
    this.filtroService.cambiarFiltro("Profesión");
  }
  rol;
  myForm: FormGroup;
  search_nameF: string = '';

  getControlsByOffice(event){
    const office_id = event.target.value;
    console.log('ID de oficina seleccionado:', office_id);
    this.myForm.value.area_id = '';
    this.myForm.value.program_id = '';
    this.DatosUser.area_id = null;
    this.DatosUser.program_id = null;
    this.arrArea = [];
    this.arrProgram = [];
    this.getPrograms(office_id);
    this.getAreas(office_id);
  }

  ngOnInit(): void {
    this.buildForm();
    this.getRoles();
    this.getOffices();
    this.obtenerAdmin(1);
    // this.dropdownList = [
    //   { id: 1, itemName: "India" },
    //   { id: 2, itemName: "Singapore" },
    //   { id: 3, itemName: "Australia" },
    //   { id: 4, itemName: "Canada" },
    //   { id: 5, itemName: "South Korea" },
    // ];

    this.dropdownSettings = {
      singleSelection: false,
      text: "Seleccionar roles",
      selectAllText: 'Seleccionar todo',
      unSelectAllText: 'Deseleccionar todo',
      enableSearchFilter: true,
      enableCheckAll: true, 
      itemsShowLimit: 3,
      classes: "myclass custom-class",
      badgeShowLimit: 3,
      searchPlaceholderText: 'Buscar',
      noDataLabel: 'No hay roles disponibles'
    };
    
    
  }
  loadData;
  data: genericGet = {
    count: 0,
    page: 0,
    rows: [],
  };

  allUser: any[];

  total$;
  actualUserId: number;
  count;
  qtyPage = 5;
  pageSize = 1;
  collectionSize = 0;
  id_company: number;

  options:any[] = [];
  handleTagsChange(tags: string[]) {
    console.log(tags); // Aquí tendrás las etiquetas seleccionadas del componente hijo
    // Haz lo que necesites con las etiquetas aquí
}

  getOffices(){
    this.officeService.getofficeoutpagination().subscribe(
      (res) => {
        // this.options = res.data.rows;
        this.options = res.data.rows.filter(item => item.status === true);
        // console.log('offices', res.data.rows);

      },
      (error) => {
        console.log('error', error);
      }
    )
  }

  getRoles(){
    this.rolService.getAllRoles().subscribe(
      (res) => {
        const data = res.data.rows.filter(item => item.status === true);
        // console.log('roles', res.data.rows);
        data.forEach( (row) =>{
          this.dropdownList.push({
            id: row.id,
            itemName: row.name
          })
        })
      },
      (error) => {
        console.log('error', error);
      }
    )
  }

  arrArea;
  arrProgram;
  loadingPrograms: boolean;
  loadingAreas: boolean;
  getPrograms(office_id){
    this.loadingPrograms = true;
    this._sProgram.getprogram_iniciativeByOffice(office_id).subscribe(
      (res) => {
        this.arrProgram = res.data.rows.filter(item => item.status === 1);
        this.loadingPrograms = false;
        // this.arrProgram = res.data.rows;
        console.log('program arr',res.data.rows, this.arrProgram);

      },
      (error) => {
        console.log('error', error);
      }
    )
  }

  getAreas(office_id){
    this.loadingAreas = true;
    this._sArea.getareaByOffice(office_id).subscribe(
      (res) => {
        // this.arrArea = res.data.rows;
        this.arrArea = res.data.rows.filter(item => item.status === 1);
        this.loadingAreas = false;
                console.log('area arr',res.data.rows, this.arrArea);

      },
      (error) => {
        console.log('error', error);
      }
    )
  }

  isVisibleOption(option: string): boolean {
    if (this.rol === "admin") {
      return option === "admin" || option === "client";
    } else if (this.rol === "client") {
      return option === "client" || option === "viewer_client";
    }
    return false;
  }

  cambiaPage($event) {
    this.page = $event;
    this.obtenerAdmin($event);
  }

  obtenerAdmin(page) {
      this.loadData = true;
      this._sUsuarios.getUserListFilterName(page, this.qtyPage, this.search_nameF).subscribe((res) => {
        console.log(res);

        this.loadData = false;
        this.data.rows = res.data.rows;
        this.allUser = res.data.rows;

        this.total$ = res.data.count;
        let count: any = res.data.count;

        this.collectionSize = Number(count) / this.qtyPage;
      });
  }

  buildForm(): void {
    this.myForm = this.fb.group({
      name: ["", Validators.required],
      paternal_lastname: ["", Validators.required],
      maternal_lastname: ["", Validators.required],
      document_type: ["", Validators.required],
      document_number: ["", [Validators.required, Validators.minLength(8)]],
      office_id: ["", Validators.required],
      area_id: ["", Validators.required],
      program_id: ["", Validators.required],
      // username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      notifications: [true, Validators.required],
    });
    /* 
    this.myForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged();  */
  }
  /*   formErrors;
  onValueChanged(data?: any) {
    if (!this.myForm) {
      return;
    }
    const form = this.myForm;

    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        this.formErrors[field] = "";
        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + " ";
            }
          }
        }
      }
    }
  } */
  empresas;
  obtenerEmpresa() {
    this._sUsuarios.getCompanies().subscribe(
      (data) => {
        this.empresas = data.data;
      },
      (error) => {
        if (error.status == 401) {
          this._sAuth.signout();
        }
      }
    );
  }

  // Para validar que no se pueda deshabilitar el usuario actual
  disableUser(row): boolean {
    if (row.id === this.actualUserId) {
      return true;
    } else {
      return false
    }
  }

  returnAdmin(typeUser): string {
    switch (typeUser) {
      case "admin":
        return "Administrador";
      case "client":
        return "Cliente";
      case "viewer_client":
        return "Visor";
      case "postulant":
        return "Postulante";
      default:
        return "Error";
    }
  }

  isVisibleCompanyField(): boolean {
    const adminRole = this.myForm.get("admin_rol_id")?.value;
    return (
      this.rol === "admin" &&
      (adminRole === "client" || adminRole === "viewer_client")
    );
  }

  eve;
  modalUserName: string;
  deleteInvoice(row, modal) {
    console.log(row);
    this.modalUserName =  row.name + " " + row.paternal_lastname + " " + row.maternal_lastname
    if (row.state == false) {
      this.eve = true;
    } else {
      this.eve = false;
    }

    this.modalService
      .open(modal, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {
            this._sUsuarios
              .habilitarAdmin(row.id, this.eve)
              .subscribe(
                (resp) => {
                  this.toastr.success(
                    "Cambio realizado",
                    "Se cambio el estado del usuario",
                    {
                      timeOut: environment.timeOutmessage,
                      closeButton: true,
                      progressBar: true,
                    }
                  );
                  this.cambiaPage(1);
                },
                (error) => {
                  this.toastr.error(
                    "Error al cambiar estado del usuario.",
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

  openUsuariosAdd(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", size: "md", centered: true })
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
      .open(content, { ariaLabelledBy: "modal-basic-title", size: "md", centered: true})
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
    console.log(this.myForm.value);

    if (
      this.myForm.get("name").value == "" ||
      this.myForm.get("name").value == null ||
      this.myForm.get("name").value == undefined
    ) {
      this.toastr.error("¡Necesita   nombres!", "Cambio no realizado", {
        timeOut: environment.timeOutmessage,
        closeButton: true,
        progressBar: true,
      });
      return;
    }

    if (
      this.myForm.get("paternal_lastname").value == "" ||
      this.myForm.get("paternal_lastname").value == null ||
      this.myForm.get("paternal_lastname").value == undefined
    ) {
      this.toastr.error(
        "¡Necesita ingresar apellido paterno!",
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
      this.myForm.get("maternal_lastname").value == "" ||
      this.myForm.get("maternal_lastname").value == null ||
      this.myForm.get("maternal_lastname").value == undefined
    ) {
      this.toastr.error(
        "¡Necesita ingresar apellido materno!",
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
      this.myForm.get("document_type").value == "" ||
      this.myForm.get("document_type").value == null ||
      this.myForm.get("document_type").value == undefined
    ) {
      this.toastr.error(
        "¡Necesita seleccionar un tipo de documento!",
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
      this.myForm.get("document_number").value == "" ||
      this.myForm.get("document_number").value == null ||
      this.myForm.get("document_number").value == undefined
    ) {
      this.toastr.error(
        "¡Necesita ingresar un número de documento mayor a 8 dígitos!",
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
      this.myForm.get("program_id").value == "" ||
      this.myForm.get("program_id").value == null ||
      this.myForm.get("program_id").value == undefined
    ) {
      this.toastr.error(
        "¡Necesita seleccionar un programa!",
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
      this.myForm.get("area_id").value == "" ||
      this.myForm.get("area_id").value == null ||
      this.myForm.get("area_id").value == undefined
    ) {
      this.toastr.error(
        "¡Necesita seleccionar un área!",
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
      this.myForm.get("office_id").value == "" ||
      this.myForm.get("office_id").value == null ||
      this.myForm.get("office_id").value == undefined
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
      this.myForm.get("email").value == "" ||
      this.myForm.get("email").value == null ||
      this.myForm.get("email").value == undefined
    ) {
      this.toastr.error(
        "¡Necesita ingresar un correo!",
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

  confirmCreate: boolean = false;
  confirmationButton() {
    this.confirmCreate = true;
  }

  agregar() {
    this.workback = true;
    const validar = this.validarContratacion();

    if (validar) {
      const formValue = this.myForm.value;
      const roles = this.selectedItems.map(item => item.id);
      const requestBody = { ...formValue, roles };
      console.log(requestBody);
      
        this._sUsuarios.createUser(requestBody).subscribe(
            (resp) => {
              this.workback = false;
              this.modalService.dismissAll();
              this.toastr.success("¡Usuario agregado!", "Cambio realizado", {
                timeOut: environment.timeOutmessage,
                closeButton: true,
                progressBar: true,
              });
              this.buildForm();
              this.cambiaPage(1);
              // this.confirmCreate = false;
            },
            (error) => {
              this.workback = false;
              this.toastr.error(
                "Error al crear el usuario.",
                `${error.error.errors[0].msg}`,
                {
                  timeOut: environment.timeOutmessage,
                  closeButton: true,
                  progressBar: true,
                }
              );
              // this.confirmCreate = false;
            }
          );
      } else {
        this.workback = false;
      // this.confirmCreate = false;
      return true;
      }
  }



  cerrarModal() {
    this.modalService.dismissAll();
  }

  DatosUpdate;
  DatosUser = {
    name: '',
    paternal_lastname: '',
    maternal_lastname: '',
    document_type: '',
    document_number: '',
    email: '',
    office_id:0,
    area_id:0,
    program_id: 0,
    notifications: false,
    roles: []
  };
  confirmResut;

  workback;
  editarUsuarios() {
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

  validarEditar() {
    console.log('validar',this.DatosUser);
    
    if (this.DatosUser.name && this.DatosUser.name !== '' && this.DatosUser.paternal_lastname && this.DatosUser.paternal_lastname !=='' && this.DatosUser.maternal_lastname && this.DatosUser.maternal_lastname !=='' &&
      this.DatosUser.document_type && this.DatosUser.document_type !== '' && this.DatosUser.document_type !== undefined  && this.DatosUser.document_number && this.DatosUser.document_number !== '' && this.DatosUser.document_number !== undefined &&  this.DatosUser.email && this.DatosUser.email !== '' && this.DatosUser.office_id && 
      this.DatosUser.office_id !== null && this.DatosUser.office_id !== undefined && this.DatosUser.area_id && this.DatosUser.area_id !== null && this.DatosUser.area_id !== undefined && this.DatosUser.program_id && this.DatosUser.program_id !== null && this.DatosUser.program_id !== undefined
      ) {
      return true;
    } else {
      this.toastr.error(
        "Error al editar el usuario.",
        "Todos los campos son obligatorios.",
        {
          timeOut: environment.timeOutmessage,
          closeButton: true,
          progressBar: true,
        }
      );
      return false;
    }
  }
  editar() {
    this.workback = true;
    this.DatosUser.area_id = +this.DatosUser.area_id;
    this.DatosUser.office_id = +this.DatosUser.office_id;
    this.DatosUser.program_id = +this.DatosUser.program_id;
    const validar = this.validarEditar();
    const rolesBefore = JSON.parse(this.DatosUpdate).roles.map(item => item.id)
    const rolesAfter = this.DatosUser.roles.map(item => item.id);
    const rolesToAdd = rolesAfter.filter(roleId => !rolesBefore.includes(roleId));
    const rolesToRemove = rolesBefore.filter(roleId => !rolesAfter.includes(roleId));
    const ids_final = {
      add: rolesToAdd,
      remove: rolesToRemove
    };

    const body = { ...this.DatosUser, roles: ids_final };
    
console.log(rolesBefore, rolesAfter, ids_final, body);
console.log(validar, this.DatosUser, body);
    if (validar) {
      
      
      this._sUsuarios.updateAdmin(body).subscribe(
        (resp) => {
          this.workback = false;
          this.modalService.dismissAll();
          this.toastr.success("¡Usuario actualizado!", "Cambio realizado", {
            timeOut: environment.timeOutmessage,
            closeButton: true,
            progressBar: true,
          });
          this.obtenerAdmin(this.page);
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

  clog(){
    console.log('clog',this.DatosUser);
    
  }

  async confirm(index, row, content) {
    // this.DatosUpdate = JSON.stringify(row);
    // this.DatosUser = JSON.parse(JSON.stringify(row));

    // console.log("datos ", this.DatosUpdate, this.DatosUser);
    // this.getControlsByOffice(row.office_id)
    this.arrArea = [];
    this.arrProgram = [];
    await this.getPrograms(row.office_id);
    await this.getAreas(row.office_id);
    this._sUsuarios.getUserById(row.id).subscribe(data => {
      this.DatosUser = JSON.parse(JSON.stringify(data.data));
      const rolesTransformados = this.DatosUser.roles.map((rol) => ({
        id: rol.id,
        itemName: rol.name
      }));

      this.DatosUser.roles = rolesTransformados;
      this.DatosUpdate = JSON.stringify(this.DatosUser);
      console.log(this.DatosUpdate, this.DatosUser);
      
    })

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

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  onItemSelect(item: any) {
    console.log(item, this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }
}
