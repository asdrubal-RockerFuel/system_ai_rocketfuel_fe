import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ca } from 'date-fns/locale';
import { ToastrService } from "ngx-toastr";
import { requirementsService } from 'src/app/shared/services/requirements.service';
import { genericGet } from 'src/app/shared/utils/genericGet.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-maestro-requerimientos',
  templateUrl: './maestro-requerimientos.component.html',
  styleUrls: ['./maestro-requerimientos.component.scss']
})
export class MaestroRequerimientosComponent implements OnInit {
  requisitosArr: UntypedFormArray;
  myForm: UntypedFormGroup;
  loadData: boolean = false;
  allRequirements: any[] = [];
  qtyPage = 5;
  collectionSize = 0;
  page = 1;
  pageSize = 1;
  data: genericGet = {
    count: 0,
    page: 0,
    rows: [],
  };
  modalRequerimiento: string = "";
  compra: boolean = false;
  contratacion: boolean = false;
  solicitado: boolean = false;
  aprobado: boolean = false;
  visto_bueno: boolean = false;
  aprobacion_pp: boolean = false;
  aprobacion_director: boolean = false;
  actualUserId: number;
  selectedOption: number = 1;
  stateRow:  boolean = false;
  datosRequerimiento: any = {
    id: 0,
    name: "",
    lastName: "",
    email: "",
    phone: "",
    area_id: 0,
    program_name: "",
    office_id: 0,
    status: 0,
  };
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    private _sRequirement: requirementsService,
    ) {


    this.actualUserId = Number(localStorage.getItem("idUser"));

  }

  ngOnInit(): void {
    this.buildForm();
    this.getRequirements(1);
  }




  cambiaPage($event) {
    this.page = $event;
    this.getRequirements($event);
  }

  buildForm(): void {
    this.myForm = this.formBuilder.group({
      name: ["", Validators.required],
      lastname: ["", Validators.required],
      phone: ["", Validators.required],
      office_id: ["", Validators.required],
      area_id: ["", Validators.required],
      program_id: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
    });

  }

  getRequirements(page) {
    this.loadData = true;
    this._sRequirement.listRequirements(page, this.qtyPage).subscribe(
      res => {
        console.log('res list req', res);
        this.loadData = false;
        this.data.rows = res.data.rows;
        this.allRequirements = res.data.rows;
        this.collectionSize = res.data.count / this.qtyPage;
        console.log(this.allRequirements, this.allRequirements.length)
      },
      err => {
        console.log('err list req', err);
        
      });
  }

  // Para validar que no se pueda deshabilitar el usuario actual
  disableUser(row): boolean {
    if (row.id === this.actualUserId) {
      return true;
    } else {
      return false
    }
  }

  cerrarModal() {
    this.modalService.dismissAll();
  }
  openRequirementsAdd() {
    this.router.navigateByUrl('pages/maestro-requerimientos/new');
  }


 async handleEditRequirement(row) {
console.log(row)

this.router.navigateByUrl(`pages/maestro-requerimientos/edit/${row.id}`);
// await this._sRequirement.getRequirementById(row.id).subscribe(
//   data => {
//     console.log(data)
//     this.datosRequerimiento = data;
//   },)
 }

   deleteInvoice(row, modal) {
     console.log(row);
    this.modalRequerimiento = `${row.name} ${row.lastName }`     
     if (row.state == false) {
     this.stateRow = true;
   } else {
     this.stateRow = false;
   }

   this.modalService
     .open(modal, { ariaLabelledBy: "modal-basic-title", centered: true })
     .result.then(
       (result) => {

        console.log('open')
           this._sRequirement
             .disableRequirementById(row.id, this.stateRow)
             .subscribe(
               (resp) => {
                 this.toastr.success(
                   "Cambio realizado",
                   "Se cambio el estado del requerimiento correctamente.",
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
                   "Error al cambiar estado del requerimiento.",
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
}
