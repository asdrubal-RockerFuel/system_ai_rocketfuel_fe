import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormArray, Form, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { th } from 'date-fns/locale';
import { ToastrService } from 'ngx-toastr';
import { proveedorService } from 'src/app/shared/services/proveedor.service';
import { requirementsService } from 'src/app/shared/services/requirements.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-requerimiento',
  templateUrl: './requerimiento.component.html',
  styleUrls: ['./requerimiento.component.scss']
})
export class RequerimientoComponent implements OnInit {
  items: UntypedFormArray;
  purchase: boolean;
  engagement: boolean;
  solicitado: boolean;
  aprobado: boolean;
  visto_bueno: boolean;
  aprobacion_pp: boolean;
  aprobacion_director: boolean;
  selectedOption: number = 1;
  myForm: UntypedFormGroup;
  formRequirements: UntypedFormGroup;
  item_sum: number = 0;
  p_total_sum: number = 0;
  id:number;

  isEdit: boolean = false;
  isReview:boolean = false;

  requisitoAprobado: boolean = false;
  nameUser: string;
  emailUser: string;
  constructor(
    private s_proveedor: proveedorService,
    private formBuilder: UntypedFormBuilder,
    private s_requerimiento: requirementsService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) { 
    this.nameUser = localStorage.getItem('nombreCompleto');
    this.emailUser = atob(localStorage.getItem('email'));
  }

  ngOnInit(): void {
    this.initmyForm();
    // this.listProveedor();
    const url = window.location.href;
    if (url.includes("edit")) {
      this.isEdit = true;
      this.requisitoAprobado = true; // provisional
      console.log("La URL contiene 'edit'. Esto es una página de edición.");
    } else if (url.includes("review")) {
      this.isReview = true;
      console.log("La URL contiene 'edit'. Esto es una página de revisión.");
    } 

    this.id = Number(this.route.snapshot.paramMap.get("id"));
    if (this.id) {
      console.log(this.id);
      this.s_requerimiento.getRequirementById(this.id).subscribe(
        (res)=> {
          console.log( 'res req by id', res.data.items);
          this.myForm.patchValue(res.data);
          this.items.removeAt(0);
          
          res.data.items.forEach((item) => {
            this.items.push(this.formBuilder.group({
              approved: item.approved,
              description: {value: item.description, disabled:true},
              item_quantity: {value: item.item_quantity, disabled:true},
              unit_price: item.unit_price,
              total_price: item.total_price,
              currency: item.currency,
              budget_code: item.budget_code,
              budget_percentage: item.budget_percentage,
              supplier_id: item.supplier_id,
            }));
          });

          const application_date = new Date(res.data.application_date).toISOString().split('T')[0];
          const date_required = new Date(res.data.date_required).toISOString().split('T')[0];
          const deadline = new Date(res.data.deadline).toISOString().split('T')[0];
          this.myForm.get('application_date').setValue(application_date);
          this.myForm.get('date_required').setValue(date_required);
          this.myForm.get('deadline').setValue(deadline);

          console.log( 'res req by id', res.data.items, this.myForm.value.items);
          // if (this.isReview) {
          //   // this.initmyForm();
          //   this.myForm.patchValue(res.data);
          //   this.myForm.disable();
          //   console.log("La URL contiene 'edit'. Esto es una página de revisión.");
          // } else if (this.isEdit) {
          //   // this.initmyFormEdit();
          //   this.myForm.patchValue(res.data);
          //   const application_date = new Date(res.data.application_date).toISOString().split('T')[0];
          //   const date_required = new Date(res.data.date_required).toISOString().split('T')[0];
          //   const deadline = new Date(res.data.deadline).toISOString().split('T')[0];
          //   this.myForm.get('application_date').setValue(application_date);
          //   this.myForm.get('date_required').setValue(date_required);
          //   this.myForm.get('deadline').setValue(deadline);
            
          // }
          // this.getAditionalInfo(res.data);
        },
        (err)=> {
          console.log( 'err req by id', err);
        }
      )
    } else {
      this.initmyForm();
      const currentDate = new Date().toISOString().split('T')[0];
      this.myForm.get('name_user').setValue(this.nameUser);
      this.myForm.get('application_date').setValue(currentDate);
      this.myForm.get('email').setValue(this.emailUser);
    }
        

      console.log('Existe ID')
     // this.findCampaingById(this.id);

  }

  handleSave() {
    // console.log(this.purchase)
    // console.log(this.engagement)
    // console.log(this.formRequirements.value);
    const rawValues = this.myForm.getRawValue();
    const sum = {
      total_item_sum: this.item_sum,
      total_cost_sum: this.p_total_sum
    }
    let body = {
      ...sum,
      ...rawValues,
      approved: this.requisitoAprobado,
    }

    this.s_requerimiento.postRequirement(body).subscribe(
      res => {
        console.log('res post req', res)
        this.toastr.success(
          "Información enviada",
          "Requerimiento creado con éxito",
          {
            timeOut: environment.timeOutmessage,
            closeButton: true,
            progressBar: true,
          }
        );
      },
      err => {
        console.log('err post req', err)
        this.toastr.error(
          "Error al crear requerimiento.",
          `${err.error.errors[0].msg}`,
          {
            timeOut: environment.timeOutmessage,
            closeButton: true,
            progressBar: true,
          }
        );
      })
    console.log(body)
    
  }

  toggleAprobar(){
    this.requisitoAprobado = !this.requisitoAprobado;
  }

  initmyForm() {
    this.myForm = this.formBuilder.group({
      name_user: {value:'', disabled:true},
      date_required: '',
      email: {value:'', disabled:true},
      deadline:'',
      application_date: {value:'', disabled:true},
      specification: '',
      reason: '',
      purchase: '',
      engagement: '',

      // approved: false,

      items: this.formBuilder.array([this.createRowText()]),
    });

    this.items = this.myForm.get('items') as UntypedFormArray;
    console.log('aqui', this.nameUser);
    
    this.myForm.valueChanges.subscribe(() => {
      this.updateSums();
    });
  }

  // initmyFormEdit() {
  //   this.myForm = this.formBuilder.group({
  //     name_user: {value:'', disabled: false},
  //     date_required: {value:'', disabled:false},
  //     email: {value:'', disabled:false},
  //     deadline: {value:'', disabled:false},
  //     application_date: {value:'', disabled:false},
  //     specification: {value:'', disabled:false},
  //     reason: {value:'', disabled:false},
  //     purchase: {value: '', disabled: true},
  //     engagement: {value: '', disabled:true},

  //     // approved: false,

  //     items: this.formBuilder.array([this.createRowTextEdit()]),
  //   });

  //   this.items = this.myForm.get('items') as FormArray;
  //   // console.log('aqui', this.nameUser);
    
  //   // this.myForm.valueChanges.subscribe(() => {
  //   //   this.updateSums();
  //   // });
  // }

  getRowText(index: number, rowArray): UntypedFormGroup {
    return rowArray.at(index) as UntypedFormGroup;
  }

  addRowText(rowArray) {
    const newRow = this.createRowText();
    rowArray.push(newRow);
  }

  deleteRowText(index: number, form, control) {
    (form.get(control) as UntypedFormArray).removeAt(index);
  }

  createRowText(): UntypedFormGroup {
    return this.formBuilder.group({
      id: '',
      approved: [false, Validators.required],
      description: ['', Validators.required],
      item_quantity: ['', Validators.required],
      unit_price: [ '', Validators.required],
      total_price: {value: 0, disabled:false},
      currency: ['', Validators.required],
      
      budget_code: ['', Validators.required],
      budget_percentage: ['', Validators.required],
      supplier_id: [1, Validators.required],

    });
  }

  // createRowTextEdit(): FormGroup {
  //   return this.formBuilder.group({
  //     // item: ['', Validators.required],
  //     approved: [false, Validators.required],
  //     description: {value:'', disabled:true},
  //     item_quantity: {value:'', disabled:true},
  //     unit_price: [ '', Validators.required],
  //     total_price: {value: 0, disabled:true},
  //     currency: ['', Validators.required],
      
  //     budget_code: ['', Validators.required],
  //     budget_percentage: ['', Validators.required],
  //     supplier_id: [1, Validators.required],

  //   });
  // }

  calculatePTotal(index: number): number {
    const row = this.getRowText(index, this.items);
    const item_quantity = row.get('item_quantity').value;
    const pUnitario = row.get('unit_price').value;
    const calculo = item_quantity * pUnitario;
    row.get('total_price').setValue(calculo);
    return calculo
  }

  updateSums() {
    this.item_sum = this.calculateItemSum();
    this.p_total_sum = this.calculatePTotalSum();
  }

  calculateItemSum(): number {
    let sum = 0;
    this.items.controls.forEach((control) => {
      sum += control.get('item_quantity').value || 0;
    });
    return sum;
  }

  calculatePTotalSum(): number {
    let sum = 0;

    this.items.controls.forEach((control) => {
      const row = control as UntypedFormGroup;
      const pTotal = row.get('total_price').value;
  
      // Asegúrate de que pTotal sea un número antes de sumarlo
      if (!isNaN(pTotal)) {
        sum += pTotal;
      }
    });
  
    return sum;
  }

  proveedorArr = [];
  listProveedor() {
  this.s_proveedor.listAllProveedor().subscribe(
    (res)=> {
      console.log('listar proveedores', res);
      this.proveedorArr = res.data.rows.filter(row => row.status === true);
      console.log(this.proveedorArr);
    }
  )
  }

//   onFileSelected(event: Event) {
//     const file = (event.target as HTMLInputElement).files[0];
//     if (file) {
//         console.log(file);
//         // Aquí puedes manejar el archivo seleccionado, por ejemplo, subirlo a un servidor
//     }
// }

  uploadedFiles: File[] = [];
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      for (let i = 0; i < inputElement.files.length; i++) {
        const file = inputElement.files[i];
        if (this.isValidFileType(file)) {
          this.uploadedFiles.push(file);
        }
      }
    }
    inputElement.value = ''; // Limpiar la selección para permitir subir los mismos archivos nuevamente
  }

  isValidFileType(file: File): boolean {
    // Verificar si el tipo de archivo es .pdf, .png, .jpg o .jpeg
    return /\.(pdf|png|jpe?g)$/i.test(file.name);
  }

  removeFile(file: File) {
    const index = this.uploadedFiles.indexOf(file);
    if (index !== -1) {
      this.uploadedFiles.splice(index, 1);
    }
  }

  toggleTypeResquet(type: string) {
    switch (type) {
      case 'purchase':
        this.purchase = true;
        this.engagement = false;
        this.myForm.get('engagement').setValue(false);
        break;
      case 'engagement':
        this.purchase = false;
        this.engagement = true;
        this.myForm.get('purchase').setValue(false);
        break;
      case 'solicitado':
        this.solicitado = true;
        break;
      case 'aprobado':
        this.aprobado = true;
        break;
      case 'visto_bueno':
        this.visto_bueno = true;
        break;
      case 'aprobacion_pp':
        this.aprobacion_pp = true;
        break;
      case 'aprobacion_director':
        this.aprobacion_director = true;
        break;


      default:
        break;
    }

  }

  selectOption(option: number) {
    this.selectedOption = option;
  }
  previousOption() {
    if (this.selectedOption > 1) {
      this.selectedOption--;
    }
  }

  nextOption() {
    if (this.selectedOption < 4) {
      this.selectedOption++;
    }
  }
}
