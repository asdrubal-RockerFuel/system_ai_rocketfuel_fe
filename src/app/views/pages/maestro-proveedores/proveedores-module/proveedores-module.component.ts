import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { proveedorService } from 'src/app/shared/services/proveedor.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-proveedores-module',
  templateUrl: './proveedores-module.component.html',
  styleUrls: ['./proveedores-module.component.scss']
})
export class ProveedoresModuleComponent implements OnInit {

  file_sworn_declaration: any;
  fp_file: any;

  proveedorId: number;
  myForm: FormGroup;

  tableInfo = [
    {description: '¿El representante legal, socios o accionistas cuentan con antecedentes penales / judiciales?',
    response: false, letObs:false, obs: '', i:0},
    {description: '¿Usted ha trabajado anteriormente en SPDA? Indicar fecha. ¿Cuenta con familiares o conocidos que trabajen en SPDA?, de ser sí; indicar sus nombres y apellidos.',
    response: false, letObs:true, obs: '', i:1},
    {description: 'Autorizo a SPDA, a que reporten ante las entidades públicas o privadas correspondientes la información sobre mi comportamiento y/o el de la empresa que represento.',
    response: false, letObs:false, obs: '', i:2}
  ]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private s_proveedor: proveedorService,
    private toastr: ToastrService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.route.paramMap.subscribe(params => {
    this.proveedorId = Number(params.get('id'));

    if (this.proveedorId) {
      console.log(this.proveedorId);
      
      this.s_proveedor.getProveedorById(this.proveedorId).subscribe(
        (res)=> {
          console.log( 'res proveedor by id', res);
          this.myForm.patchValue(res.data);
          this.getAditionalInfo(res.data);
        },
        (err)=> {
          console.log( 'err proveedor by id', err);
        }
      )
    }
    })
  }

  buildForm(): void {
    this.myForm = this.fb.group({
    type_request: ["manual", Validators.required],
    goods: [false],
    services: [false],
    date_start:  [''],
    activity_first: [''],
    activity_second: [''],
    business_name: [''],
    ruc: [''],
    date_constitution: [''],
    tax_domicile: [''],
    reference: [''],
    department: [''],
    province: [''],
    district: [''],
    landline_supplier: [''],
    annex_supplier: [''],
    phone_supplier: [''],
    email_supplier: [''],
    name_legal_representative: [''],
    last_name_dad_legal_representative: [''],
    last_name_mom_legal_representative: [''],
    dni_legal_representative: [''],
    post_legal_representative: [''],
    date_legal_representative: [''],
    seat_legal_representative: [''],
    registration_starting_legal_representative: [''],
    zone_legal_representative: [''],
    landline_legal_representative: [''],
    annex_legal_representative: [''],
    phone_legal_representative: [''],
    name_contact: [''],
    last_name_dad_contact: [''],
    last_name_mom_contact: [''],
    post_contact: [''],
    area_contact: [''],
    email_contact: [''],
    landline_contact: [''],
    annex_contact: [''],
    phone_contact: [''],
    name_bank: [''],
    account_mn: [''],
    number_account_mn: [''],
    cci_account_mn: [''],
    account_me: [''],
    number_account_me: [''],
    cci_account_me: [''],
    igv: [''],
    perception: [''],
    rent: [''],
    account_detraction: [''],
    code_detraction: [''],
    code_operation: [''],
    // question_number_1: [false],
    // question_number_2: [false],
    // question_number_3: [false],
    // observations_question_2: [''],

    business_conduct_commitment: [false],
    health_affidavit: [false],
    sworn_declaration_conflicts_interest: [false],
    affidavit_background: [false],
    sworn_declaration_traffic_policy: [false],

    // file_supplier: [''],
    // file_sworn_declaration: ['']
    });
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
  }

  openModal(row, modal) {
    console.log(row);


    this.modalService
      .open(modal, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {
          if (row === 'fp_file') {
            this.fp_file = 'Archivo adjunto en formulario proveedor.'
          }

          if (row === 'file_sworn_declaration') {
            this.file_sworn_declaration = 'Archivo adjunto en declaración jurada.'
          }
          
          console.log('Archivos:', this.fp_file, this.file_sworn_declaration );
        },
        
        
        // (result) => {
        //     this._sUsuarios
        //       .habilitarAdmin(row.id, this.eve)
        //       .subscribe(
        //         (resp) => {
        //           this.toastr.success(
        //             "Cambio realizado",
        //             "Se cambio el estado del usuario",
        //             {
        //               timeOut: environment.timeOutmessage,
        //               closeButton: true,
        //               progressBar: true,
        //             }
        //           );
        //           this.cambiaPage(1);
        //         },
        //         (error) => {
        //           this.toastr.error(
        //             "Error al cambiar estado del usuario.",
        //             `${error.error.errors[0].msg}`,
        //             {
        //               timeOut: environment.timeOutmessage,
        //               closeButton: true,
        //               progressBar: true,
        //             }
        //           );
        //         }
        //       );

        // },

        (reason) => {}
      );
  }

  entraPermisos(endpoint: string) {
    this.router.navigate([endpoint]);
  }

  updateProveedor(id, body) { 
    this.s_proveedor.updateProveedor(id, body).subscribe(
      (res) => {
        console.log('res editar proveedor', res);
        this.toastr.success(
          "Información enviada",
          "Editado con éxito",
          {
            timeOut: environment.timeOutmessage,
            closeButton: true,
            progressBar: true,
          }
        );

        this.entraPermisos('/pages/maestro-proveedores');
      },
      (err) => {
        console.log('err crear proveedor', err);
        this.toastr.error(
          "Error al editar proveedor.",
          `${err.error.errors[0].msg}`,
          {
            timeOut: environment.timeOutmessage,
            closeButton: true,
            progressBar: true,
          }
        );
      }
    )
  }

  postProveedor(body) { 
    this.s_proveedor.postProveedor(body).subscribe(
      (res) => {
        console.log('res crear proveedor', res);
        this.toastr.success(
          "Información enviada",
          "Creado con éxito",
          {
            timeOut: environment.timeOutmessage,
            closeButton: true,
            progressBar: true,
          }
        );

        this.entraPermisos('/pages/maestro-proveedores');
      },
      (err) => {
        console.log('err crear proveedor', err);
        this.toastr.error(
          "Error al crear proveedor.",
          `${err.error.errors[0].msg}`,
          {
            timeOut: environment.timeOutmessage,
            closeButton: true,
            progressBar: true,
          }
        );
      }
    )
  }

  clearObs(){
    if(!this.tableInfo[1].response){
      this.tableInfo[1].obs = '';
    }
  }

  getAditionalInfo(body){
      this.tableInfo[0].response = body.question_number_1;
      this.tableInfo[1].response = body.question_number_2;
      this.tableInfo[2].response = body.question_number_3;
      this.tableInfo[1].obs = body.observations_question_2;
  }

  sendAditionalInfo(){
    let items = {
      question_number_1: this.tableInfo[0].response,
      question_number_2: this.tableInfo[1].response,
      question_number_3: this.tableInfo[2].response,
      observations_question_2: this.tableInfo[1].obs,
    }
    return items;
  }

  crearProveedor() {
    const formValue = this.myForm.value;
    const aditionalInfo = this.sendAditionalInfo();
    const requestBody = {};
    const requestBodyCreate = {...requestBody, ...aditionalInfo};
    const requestBodyEdit = {...this.myForm.value, ...aditionalInfo};

    for (const key in formValue) {
      const value = formValue[key];
      if (value !== null && value !== undefined && value !== '') {
        requestBody[key] = value;
      }
    }
      console.log('body', requestBody);

      if(this.proveedorId) {
        this.updateProveedor(this.proveedorId, requestBodyEdit);
      } else {
        this.postProveedor(requestBodyCreate);
      }
    }
}
