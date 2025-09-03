import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { NavigationService } from '../../../shared/services/navigation.service';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray , Validators, AbstractControl, FormControl } from "@angular/forms";
import { clientService } from 'src/app/shared/services/client.service'; 
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { companyService } from 'src/app/shared/services/company.service';


interface ElementoImg {
  tipo: string;
  titulo: string;
  valor: string;
  archivo: any;
  preview: string;
}

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {

  public onPanelOpened(panelId: string) {
    console.log('open', panelId);
    
    this.viewportScroller.scrollToAnchor(panelId);
  }
  
  public onPanelClosed(panelId: string) {
    console.log('close', panelId);
    this.viewportScroller.scrollToAnchor(panelId);
  }

  constructor(
    private viewportScroller: ViewportScroller,
    public navService: NavigationService,
    private toastr: ToastrService,
    private formBuilder: UntypedFormBuilder,
    private _sClient: clientService,
    private _sCompany: companyService) { 
    // this.navService.sidebarState.sidenavOpen = false;
    this.id_company =localStorage.getItem('empresa');
    this.getCompany(this.id_company);
  }

  id_company

  be64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAQSURBVBhXY/iPBIji/P8PANuQL9FdDoa7AAAAAElFTkSuQmCC'

  files: File[] = [];
  loading : boolean;
  loadingTab: boolean;
  myForm: UntypedFormGroup;
  logo_img : any;
  background_img :any;
  logoPreview: string | undefined;
  backgroundPreview: string | undefined;

  formDisabled: boolean = false;
  movies: any[] = [{ url_1_mve: '' }];

  companyForm: any;
  logo64: string | undefined;
  background64: string | undefined;
  typeLogo: string;
  typeBackground: string;

  pageData: { [key: string]: any } = {};
  responseStatus: { [key: string]: boolean } = {};

  forms: { form: UntypedFormGroup; disabled: boolean }[] = [];

  editId1: any;
  editId2: any;
  editId3: any;
  editId4: any;

  ngOnInit(): void {
    // this.buildForm();
    // this.initFormTab1();
    // this.initFormTab2();
    // this.initFormTab3();
    // this.initFormTab4();
    // this.getPage1('page01', this.id_company);
    // this.getPage2('page02', this.id_company);
    // this.getPage3('page03', this.id_company);
    // this.getPage4('page04', this.id_company);
    
  }

  // videoPreview: string | undefined;

  // previewVideo(event: any){
  //   const inputElement = event.target as HTMLInputElement;
  //   const videoFile = inputElement.files?.[0];

  //   if (videoFile) {
  //     this.videoPreview = URL.createObjectURL(videoFile);
  //   }
  // }

  // generateUUID() {
  //   let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
  //     /[xy]/g,
  //     function (c) {
  //       let r = (Math.random() * 16) | 0,
  //         v = c === "x" ? r : (r & 0x3) | 0x8;
  //       return v.toString(16);
  //     }
  //   );
  //   return uuid;
  // }

  // async uploadChunks() {
  //   const inputElement = document.getElementById("videoFile") as HTMLInputElement;
  //   const videoFile = inputElement.files?.[0];
  //   if (videoFile) {
  //     const uniqueName = `video_${Date.now()}${this.generateUUID()}.mp4`;
  //     const username = `video_${this.generateUUID()}`;
  //     const chunkSize = Math.ceil(videoFile.size / 10);
  //     let start = 0;
  //     let chunkNumber = 1;

  //     try {
  //       while (start < videoFile.size) {
  //         const chunk = videoFile.slice(start, start + chunkSize);
  //         const formData = new FormData();
  //         formData.append("chunk", chunk);
  //         formData.append("chunk_number", chunkNumber.toString());
  //         formData.append(
  //           "is_last_chunk",
  //           chunkNumber === 10 ? "true" : "false"
  //         );

  //         const response = await fetch(
  //           `http://localhost:4001/api/upload?filename=${uniqueName}&username=${username}`,
  //           {
  //             method: "POST",
  //             body: formData,
  //           }
  //         );

  //         if (!response.ok) {
  //           throw new Error("Error en la carga del trozo.");
  //         }
  //         try {
  //           const responseData = await response.json();
  //           console.log("Mensaje del servidor:", responseData.data.message);
  //         } catch (error) {
  //           console.error("Error al analizar la respuesta JSON:", error);
  //         }

  //         console.log(`Chunk ${chunkNumber} uploaded.`);

  //         start += chunkSize;
  //         chunkNumber++;
  //         console.log(start, chunkNumber);
  //       }
  //       start = 0;
  //       chunkNumber = 1;
  //       // Una vez que todos los trozos se han subido, se completó el video
  //       console.log("Video completado.");
  //     } catch (error) {
  //       console.error("Error al subir trozos:", error);
  //     }
  //   }
  // }
  // Editar Tab 1 -----------------------------------------------------------

  getTab1(){
this.principal= this.pageData.page01.media[0].value;
this.secundaria= this.pageData.page01.media[1].value;

const textoFormArray = this.formTab1.get('texto_derecha') as UntypedFormArray;
const texto = this.pageData.page01.section_simple;
this.setTextTable(textoFormArray, texto);

const mediaFormArray = this.formTab1.get('media') as UntypedFormArray;
const media = this.pageData.page01.media.slice(2);
mediaFormArray.clear();
media.forEach((img)=>{
  this.mediaPreview.push(img.value)
})

media.forEach((mediaItem) => {
  const mediaControl = this.formBuilder.group({
    value: '',
    change:false,
    recovered: [mediaItem.value],
    type: [mediaItem.typeExt],
    favorite: [mediaItem.favorite]
  });
  mediaFormArray.push(mediaControl);
});

    this.formTab1.patchValue({
      recPrincipal: this.pageData.page01.media[0].value,
      recSecundaria: this.pageData.page01.media[1].value,
      year: this.pageData.page01.extras[0].year_creation,
      nTrabajadores: this.pageData.page01.extras[0].workers,
      nFemale: this.pageData.page01.extras[0].female,
      nMale: this.pageData.page01.extras[0].male,
      age: this.pageData.page01.extras[0].age,
      sales: this.pageData.page01.extras[0].sales,
      linkedin: this.pageData.page01.extras[1].social_networks[1].value,
      whatsapp: this.pageData.page01.extras[1].social_networks[2].value,
      instagram: this.pageData.page01.extras[1].social_networks[0].value,
      media: media,
    })
  }

  getPage1(page: string, id: number) {
    this._sClient.getPage(page, id).subscribe(
      (res) => {
        this.pageData[page] = res;
        this.responseStatus[page] = res !== null && Object.keys(res).length > 0;
        this.editId1 = res.id_information;
        if (this.responseStatus[page]) { 
          this.forms[1].disabled = true
          this.formTab1.disable()
          this.getTab1() 
        }
      }
    );
  }
// Editar Tab 2
  getPage2(page: string, id: number) {
    this._sClient.getPage(page, id).subscribe(
      (res) => {
        this.pageData[page] = res;
        this.responseStatus[page] = res !== null && Object.keys(res).length > 0;
        this.editId2 = res.id_information;
        if (this.responseStatus[page]) { 
          this.forms[2].disabled = true
          this.formTab2.disable()
          this.getTab2() 
        }
      }
    );
  }

  getTab2(){
    this.imgInicial=this.pageData.page02.section_img[0].value;
    this.formTab2.patchValue({
      recoverImage: this.pageData.page02.section_img[0].value,
      typeImg: this.pageData.page02.section_img[0].typeExt,
      title: this.pageData.page02.section_img[0].title,
      description: this.pageData.page02.section_img[0].description,
    })

    const tarjetas = this.formTab2.get('tarjetas') as UntypedFormArray;
    const media = this.pageData.page02.extras[1].card_rotation;
    tarjetas.clear();

    media.forEach((img)=>{
      this.tarjetasPreview.push(img.value)
    })

    media.forEach((item) => {
      const mediaControl = this.formBuilder.group({
        archivo: '',
        change:false,
        recovered: [item.value],
        tipo: [item.typeExt],
        titulo:[item.title],
        texto:[item.description],
      });
      tarjetas.push(mediaControl);
    });

    const personas = this.formTab2.get('personas') as UntypedFormArray;
    const persona = this.pageData.page02.section_img.slice(1);
    personas.clear();

    persona.forEach((img)=>{
      this.personasPreview.push(img.value)
    })

    persona.forEach((item) => {
      const mediaControl = this.formBuilder.group({
        archivo: '',
        change:false,
        recovered: [item.value],
        tipo: [item.typeExt],
        titulo:[item.title],
        texto:[item.description],
      });
      personas.push(mediaControl);
    });
    
    const colaboradores = this.formTab2.get('colaboradores') as UntypedFormArray;
const colab = this.pageData.page02.extras[0].profesion;
colaboradores.clear();

colab.forEach((item) => {
  const textoControl = this.formBuilder.group({
    title: [item.title],
    description: [item.description],
  });
  colaboradores.push(textoControl);
});
  }

  // Edit tab 3 ------------------------------------------------
  getPage3(page: string, id: number) {
    this._sClient.getPage(page, id).subscribe(
      (res) => {
        this.pageData[page] = res;
        this.responseStatus[page] = res !== null && Object.keys(res).length > 0;
        this.editId3 = res.id_information;
        if (this.responseStatus[page]) { 
          this.forms[3].disabled = true
          this.formTab3.disable()
          this.getTab3()
        }
      }
    );
  }

  getTab3(){
    this.imgHitos = this.pageData.page03.section_img[0].value;
    this.imgValores = this.pageData.page03.section_img[1].value;
    this.imgEngagement = this.pageData.page03.section_img[2].value;
    this.formTab3.patchValue({
      changeH: false,
      recoverH:  this.pageData.page03.section_img[0].value,
      changeV: false,
      recoverV: this.pageData.page03.section_img[1].value,
      changeE: false,
      recoverE: this.pageData.page03.section_img[2].value,
      imgHitos: '',
      typeHitos: this.pageData.page03.section_img[0].typeExt,
      titleHitos: this.pageData.page03.section_img[0].title,
      descriptionHitos: this.pageData.page03.section_img[0].description,
      imgValores: '',
      typeValores: this.pageData.page03.section_img[1].typeExt,
      titleValores: this.pageData.page03.section_img[1].title,
      descriptionValores: this.pageData.page03.section_img[1].description,
      imgEngagement: '',
      typeEngagement:  this.pageData.page03.section_img[2].typeExt,
      titleEngagement:  this.pageData.page03.section_img[2].title,
      descriptionEngagement:  this.pageData.page03.section_img[2].description,
    })

    
    const hitosArray = this.formTab3.get('tarjetasHitos') as UntypedFormArray;
    const hitos = this.pageData.page03.extras[0].hitos;
    this.setTextTable(hitosArray, hitos);

    const valoresArray = this.formTab3.get('tarjetasValores') as UntypedFormArray;
    const valores = this.pageData.page03.extras[1].valores;
    this.setTextTable(valoresArray, valores);

    const engamentArray = this.formTab3.get('tarjetasEngagement') as UntypedFormArray;
    const engament = this.pageData.page03.section_simple;
    this.setTextTable(engamentArray, engament);
  }

// Edit tab 4------------------------------------------
getPage4(page: string, id: number) {
  this._sClient.getPage(page, id).subscribe(
    (res) => {
      this.pageData[page] = res;
      this.responseStatus[page] = res !== null && Object.keys(res).length > 0;
      this.editId4 = res.id_information;
      if (this.responseStatus[page]) { 
        this.forms[4].disabled = true
        this.formTab4.disable()
        this.getTab4()
      }
    }
  );
}

getTab4(){
  this.imgCrecimiento = this.pageData.page04.section_img[0].value;
  this.imgEquipo = this.pageData.page04.section_img[1].value;
  this.formTab4.patchValue({
    recoverC: this.pageData.page04.section_img[0].value,
    changeC: false,
    recoverE: this.pageData.page04.section_img[1].value,
    changeE: false,
    imgCrecimiento: '',
    typeCrecimiento: this.pageData.page04.section_img[0].typeExt,
    titleCrecimiento: this.pageData.page04.section_img[0].title,
    descriptionCrecimiento: this.pageData.page04.section_img[0].description,
    imgEquipo: '',
    typeEquipo: this.pageData.page04.section_img[1].typeExt,
    titleEquipo: this.pageData.page04.section_img[1].title,
    descriptionEquipo: this.pageData.page04.section_img[1].description,
    });

    const ventajasArray = this.formTab4.get('tarjetasVentajas') as UntypedFormArray;
    const ventajas = this.pageData.page04.section_simple[0].ventajas;
    this.setTextTable(ventajasArray, ventajas);
  }

  setTextTable(fGroup: UntypedFormArray, array:any){
    fGroup.clear();
    array.forEach((item) => {
      const textoControl = this.formBuilder.group({
        title: [item.title],
        description: [item.description],
      });
      fGroup.push(textoControl);
    });
  }
  // Accordeon ----------------------------------------------

  expandedIndex: number = -1;

  toggleAccordionItem(index: number): void {
    if (this.expandedIndex === index) {
      this.expandedIndex = -1;
    } else {
      this.expandedIndex = index;
    }
  }

  isItemExpanded(index: number): boolean {
    return this.expandedIndex === index;
  }

  // Editar datos de empresa ----------------------------------------------
  toggleFormEdit(index: number) {
    this.forms[index].disabled = !this.forms[index].disabled;
    const form = this.forms[index].form;

    if (this.forms[index].disabled) {
      form.disable();
    } else {
      form.enable();
    }
  }

  saveForm() {
    console.log(this.myForm.value, this.companyForm);
  
    let body: any = {};
  
    for (const key in this.myForm.value) {
      if (this.myForm.value.hasOwnProperty(key) && this.myForm.value[key] !== this.companyForm[key]) {
        body[key] = this.myForm.value[key];
      }
    }
  console.log(body);
  
    if (Object.keys(body).length === 0) {
      this.toastr.error(
        "Revisar los datos ingresados.",
        "No se han detectado cambios en el formulario.",
        {
          timeOut: environment.timeOutmessage,
          closeButton: true,
          progressBar: true,
        }
      );
    } else {


      this._sCompany.editCompany(body,this.id_company).subscribe(
          (res) => {
            this.toastr.success(
              "Cambio realizado",
              "La información se envió con éxito!",
              {
                timeOut: environment.timeOutmessage,
                closeButton: true,
                progressBar: true,
              }
            )

            this.companyForm = this.myForm.value
          })
    }
    this.toggleFormEdit(0)
  }

  //Toma datos de la Empresa --------------------------------------------

  buildForm() {
    this.myForm = this.formBuilder.group({
      // commercial_name: ['', Validators.required],
      fiscal_name: ['', Validators.required],
      name_representatives: ['', Validators.required],
      lastName_representatives: ['', Validators.required],
      hiring_average: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      way_pay_id: ['', Validators.required],
      type_plan_id: ['', Validators.required],
      type_ats_id: ['', Validators.required],
      active_workers: ['', Validators.required],
      limit_offers: ['', Validators.required],
      country_id: ['', Validators.required],
      company_name: ['', Validators.required],
      // ruc: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      contact_number: ['',[Validators.required, Validators.pattern(/^[0-9]+$/)]],
      web_page: ['', Validators.required],
      corporate_mail: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
      category_id: ['', Validators.required],
      location_id: ['', Validators.required],
      numbers_offers: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      // image_logo_id: [1, Validators.required],
      // background_image_id: [1, Validators.required],
      company_size_id: ['', Validators.required],
      // level_english_id: ['', Validators.required],
    });

    this.forms.push({ form: this.myForm, disabled: true });
  }
  companyName: string = '';
  companyRUC: string = '';
  getCompany(id){
    this._sClient.getCompany(id).subscribe(
        (response) => {
          const res = response[0]
          console.log(res);
          
          this.companyName = res.commercial_name;
          this.companyRUC = res.ruc;
          this.logoPreview = res.url_logo;
          this.backgroundPreview = res.url_banner;
          this.myForm.patchValue({
            // commercial_name: res.commercial_name,
            fiscal_name: res.fiscal_name,
            name_representatives: res.name_representatives,
            lastName_representatives: res.lastName_representatives,
            hiring_average: res.hiring_average,
            way_pay_id: res.way_pay_id,
            type_plan_id: res.type_plan_id,
            type_ats_id: res.type_ats_id,
            active_workers: res.active_workers,
            limit_offers: res.limit_offers,
            country_id: res.country_id,
            company_name: res.commercial_name,
            // ruc: res.ruc,
            contact_number: res.contact_number,
            web_page: res.web_page,
            corporate_mail: res.corporate_mail,
            description: res.description,
            category_id: res.category_id,
            location_id: res.location_id,
            numbers_offers: res.numbers_offers,
            // image_logo_id: res.image_logo_id,
            // background_image_id: res.background_image_id,
            company_size_id: res.company_size_id,
            // level_english_id: res.level_english_id,
            // state: res.state,
            // created_date: res.created_date
            // Otros campos del formulario...
          });          
          this.companyForm = this.myForm.value;
          this.myForm.disable();
        },
        (error) => {
          console.log('ERROR', error);
        }
      )
    
  }

  // Funcion brayan para imágenes -----------------------------------------------------------
  
  formatFilesArray(files) {
    const formattedArray = [];
    
    for (let i = 0; i < files.length; i++) {
      const urlKey = `url_${i + 1}_img`;
      const formattedObject = { [urlKey]: files[i] };
      formattedArray.push(formattedObject);
    }
    
    return formattedArray;
  }

	onSelect(event) {
		this.files.push(...event.addedFiles);
	}

	onRemove(event) {
		this.files.splice(this.files.indexOf(event), 1);
	}

  arrFilesToShow = [];
  arrFilesDataToSend = [];
  arrFilesToSend: File[] = [];

  changeFileName(file: File, newFileName: string): File {
    const blob = file.slice(0, file.size, file.type);
    const newFile = new File([blob], newFileName, { type: file.type });
    return newFile;
  }

  uploadFiles2(event) {

    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];


        const numberCode = Math.floor(
          100000000000 * Math.random()
        ).toString();
        const newFileName = numberCode + '.' + file.name.split('.').pop();
        const newFile = this.changeFileName(file, newFileName);

        this.arrFilesToSend.push(newFile);

        const data = {
          CodigoArchivo: numberCode,
          OriginalFileName: file.name,
          NombreOriginalDocumento: file.name,
          FechaSubida: new Date(),
        };

        this.arrFilesDataToSend.push(data);
        
        const dataToShow = {
          NombreOriginalDocumento: file.name,
          FechaSubida: new Date(),
        };

        this.arrFilesToShow.push(dataToShow);
  }
}

// ----------------------------------------------------------------------
  subirImagenes(): any {
    this.loading = true;
    const requestBody = {
      ...(this.logo64 && {
        image_logo_id: {
          typeExt: this.typeLogo,
          image_logo_id: this.logo64,
          type: 'img',
        },
      }),
      ...(this.background64 && {
        background_image_id: {
          typeExt: this.typeBackground,
          background_image_id: this.background64,
          type: 'img',
        },
      }),
    };
  
    if (Object.keys(requestBody).length > 0) {
      this._sCompany.updateCompany(requestBody, this.id_company)
      .subscribe(
        (response) => {
          console.log(requestBody);
          
            this.toastr.success(
              "Cambio realizado",
              "La información se envió con éxito!",
              {
                timeOut: environment.timeOutmessage,
                closeButton: true,
                progressBar: true,
              }
            )
            this.loading = false;
            this.logo64 = '';
            this.background64= '';
            this.getCompany(this.id_company);
        },
        (error) => {
          console.error('Error en la solicitud al servicio:', error);
            this.toastr.error(
              "Error al enviar los datos.",
              "Hubo un error al cargar las imágenes.",
              {
                timeOut: environment.timeOutmessage,
                closeButton: true,
                progressBar: true,
              }
            );
            this.loading = false;
        }
      );
    } else {
            this.toastr.error(
              "Error al enviar los datos.",
              "No se han detectado cambios",
              {
                timeOut: environment.timeOutmessage,
                closeButton: true,
                progressBar: true,
              }
            );
            this.loading = false;
    }

  }

  // Seleccionar imagen logo y fondo -----------------------------------------------------------

  selectLogo(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.logoPreview = e.target.result;
        this.logo64 = this.logoPreview; // Guarda el valor en la variable logo64
      
        const filename = file.name;
        const fileExt = filename.toLowerCase().split('.').pop() || ''; // Obtener la última parte del nombre después del último punto
        this.typeLogo = fileExt;
      };
      reader.readAsDataURL(file);
    } else {
      this.logoPreview = undefined;
      this.logo64 = undefined; // Reinicia el valor de logo64 si no se selecciona ningún archivo
      this.typeLogo = '';
    }
  }

  selectBackground(event:any) {
    const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
      reader.onload = (e: any) => {
        this.backgroundPreview = e.target.result;
        this.background64 = this.backgroundPreview; // Guarda el valor en la variable logo64
      
        const filename = file.name;
        const fileExt = filename.toLowerCase().split('.').pop() || ''; // Obtener la última parte del nombre después del último punto
        this.typeBackground = fileExt;
      };
      reader.readAsDataURL(file);

  } else {
    this.backgroundPreview = undefined;
    this.background64 = undefined;
    this.typeBackground = '';
  }
}

  // -------------------- Form Tab 1 ---------------------------------------------

  formTab1: UntypedFormGroup;
  texto_derecha: UntypedFormArray;
  mediaPreview: string[] = [];
  media_tab1: any[] = [];
  principal:string;
  secundaria:string;

  initFormTab1() {
    this.formTab1 = this.formBuilder.group({
      recPrincipal: '',
      changePrincipal: false,
      recSecundaria: '',
      changeSecundaria: false,
      principal: ['', Validators.required],
      typePrincipal: ['jpg', Validators.required],
      secundaria: ['', Validators.required],
      typeSecundaria: ['jpg', Validators.required],
      year: ['', Validators.required],
      nTrabajadores: ['', Validators.required],
      nFemale: ['', Validators.required],
      nMale: ['', Validators.required],
      age: ['', Validators.required],
      sales: ['', Validators.required],
      linkedin: ['', Validators.required],
      whatsapp: ['', Validators.required],
      instagram: ['', Validators.required],
      texto_derecha: this.formBuilder.array([this.createRowText()]),
      media: this.formBuilder.array([this.createMedia()])
    });
  
    this.texto_derecha = this.formTab1.get('texto_derecha') as UntypedFormArray;
    this.forms.push({ form: this.formTab1, disabled: false });
  }

  selectPrincipal(event: any) {
    const file = (event.target as HTMLInputElement).files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.principal = reader.result as string;
        const img = this.principal;
      
        const filename = file.name;
        const fileExt = filename.toLowerCase().split('.').pop() || '';
        const imgType = fileExt;
  
        // Actualizar los valores del formulario aquí, dentro de reader.onload
        this.formTab1.patchValue({
          principal: img,
          typePrincipal: imgType,
          changePrincipal: true
        });
        this.formTab1.get('principal').updateValueAndValidity();
      };
  
      reader.readAsDataURL(file);
    } else {
      this.principal = undefined;
  
      // En el caso del 'else', actualiza los valores del formulario a valores vacíos
      this.formTab1.patchValue({
        principal: '',
        typePrincipal: '',
        changePrincipal: false
      });
      this.formTab1.get('principal').updateValueAndValidity();
    }
  }

  selectSecundaria(event: any) {
    const file = (event.target as HTMLInputElement).files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.secundaria = reader.result as string;
        const img = this.secundaria;
      
        const filename = file.name;
        const fileExt = filename.toLowerCase().split('.').pop() || '';
        const imgType = fileExt;
  
        // Actualizar los valores del formulario aquí, dentro de reader.onload
        this.formTab1.patchValue({
          secundaria: img,
          typeSecundaria: imgType,
          changeSecundaria: true
        });
        this.formTab1.get('secundaria').updateValueAndValidity();
      };
  
      reader.readAsDataURL(file);
    } else {
      this.secundaria = undefined;
  
      // En el caso del 'else', actualiza los valores del formulario a valores vacíos
      this.formTab1.patchValue({
        secundaria: '',
        typeSecundaria: '',
        changeSecundaria: false
      });
      this.formTab1.get('secundaria').updateValueAndValidity();
    }
  }

  // controles tabla de texto --------------------------------------------------------------------------

  createRowText(): UntypedFormGroup {
    return this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  getRowText(index: number, rowArray): UntypedFormGroup {
    return rowArray.at(index) as UntypedFormGroup;
  }

  addRowText(rowArray) {
    const newRow = this.createRowText();
    rowArray.push(newRow);
  }
  
  deleteRowText(index: number,form, control) {
    (form.get(control) as UntypedFormArray).removeAt(index);
  }

  // Fxs Tabla Media --------------------------------------------------
// Agrega campo favorite para estrellita en imagenes
  createMedia(): UntypedFormGroup {
  return this.formBuilder.group({
    favorite: [false],
    value: ['', Validators.required],
    type: ['', Validators.required],
    recovered: [''],
    change: [false]
  });
}

getMediaControls(): AbstractControl[] {
  return (this.formTab1.get('media') as UntypedFormArray).controls;
}

onCheckboxChange(index) {
  const mediaFormGroup = (this.formTab1.get('media') as UntypedFormArray).value;
  const mediaFormGroupIndex = (this.formTab1.get('media') as UntypedFormArray).at(index);
  const control = mediaFormGroupIndex.get('favorite');

  const countFav = mediaFormGroup.filter(element => element.favorite === true).length;

  if (control.value && countFav > 6) {
    control.patchValue(false);
    this.toastr.error(
      "Puede destacar un máximo de 6 imágenes.",
      "Máximo alcanzado.",
      {
        timeOut: environment.timeOutmessage,
        closeButton: true,
        progressBar: true,
      }
    );

  }
}

previewMedia(event: any, index: number) {
  const file = (event.target as HTMLInputElement).files[0];
  const media = (this.formTab1.get('media') as UntypedFormArray).at(index);

  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.mediaPreview[index] = reader.result as string;
      const img = this.mediaPreview[index];
    
      const filename = file.name;
      const fileExt = filename.toLowerCase().split('.').pop() || '';
      const imgType = fileExt;

      // Actualizar los valores del formulario aquí, dentro de reader.onload
      media.patchValue({
        value: img,
        type: imgType,
        change: true
      });
      media.get('value').updateValueAndValidity();
    };
    reader.readAsDataURL(file);
  } else {
    this.mediaPreview[index] = undefined,
    media.patchValue({
      value: '',
      type: '',
      change: false
    });
    media.get('value').updateValueAndValidity();
  }
}

agregarMedia() {
  const nuevaMedia = this.createMedia();
  (this.formTab1.get('media') as UntypedFormArray).push(nuevaMedia);
}

eliminarMedia(index: number) {
  const formArray = this.formTab1.get('media') as UntypedFormArray;
  this.mediaPreview.splice(index, 1);

  formArray.removeAt(index);
}

// Enviar ----------------------------------------------------------------------------
  enviarTableT1(){

    const bodyT1 = {
      company_id: parseInt(this.id_company, 10),
      value: "page01",
      page_id: 33,
      media:[],
      section_img:[],
      section_simple:[],
      extras:[
      {year_creation: this.formTab1.get('year').value, 
        workers: this.formTab1.get('nTrabajadores').value,
        male: this.formTab1.get('nMale').value,
        female: this.formTab1.get('nFemale').value,
        age: this.formTab1.get('age').value,
        sales: this.formTab1.get('sales').value },
        { social_networks: [] }
      ],
    };


    bodyT1.media.push({
      value: this.formTab1.get('principal').value,
      type: 'img',
      favorite: false,
      typeExt: this.formTab1.get('typePrincipal').value
    }, {
      value: this.formTab1.get('secundaria').value,
      typeExt: this.formTab1.get('typeSecundaria').value,
      favorite: false,
      type: 'img',
    });
    
    const media = this.formTab1.get('media').value;
    media.forEach((item) => {
    bodyT1.media.push({
      value: item.value,
      type: 'img',
      typeExt: item.type,
      favorite: item.favorite
    });
  });
  
    const texto_derecha = this.formTab1.get('texto_derecha').value;
    if (texto_derecha) {
      bodyT1.section_simple = texto_derecha
    }

    bodyT1.extras[1].social_networks = [{
      type: 'instagram', value: this.formTab1.get('instagram').value},
      {type: 'linkedin', value:this.formTab1.get('linkedin').value},
      {type: 'whatsapp', value:this.formTab1.get('whatsapp').value}]
      this.sendTabForm(this.formTab1, bodyT1)
  }

  editarTableT1() {
    const bodyT1 = {
      company_id: parseInt(this.id_company, 10),
      value: "page01",
      page_id: 33,
      media:[],
      section_img:[],
      section_simple:[],
      extras:[
      {year_creation: this.formTab1.get('year').value, 
        workers: this.formTab1.get('nTrabajadores').value,
        male: this.formTab1.get('nMale').value,
        female: this.formTab1.get('nFemale').value,
        age: this.formTab1.get('age').value,
        sales: this.formTab1.get('sales').value },
        { social_networks: [] }
      ],
    };


    bodyT1.media.push({
      changeValue:(this.formTab1.get('changePrincipal').value) ?this.formTab1.get('principal').value :this.be64,
      change: this.formTab1.get('changePrincipal').value,
      value: this.formTab1.get('recPrincipal').value,
      typeExt: (this.formTab1.get('changePrincipal').value) ?this.formTab1.get('typePrincipal').value :'jpg',
      favorite: false,
      type: 'img',
    }, {
      changeValue: (this.formTab1.get('changeSecundaria').value) ?this.formTab1.get('secundaria').value :this.be64,
      change: this.formTab1.get('changeSecundaria').value,
      value: this.formTab1.get('recSecundaria').value,
      typeExt: (this.formTab1.get('changeSecundaria').value) ?this.formTab1.get('typeSecundaria').value :'jpg',
      favorite: false,
      type: 'img',
    });

    const media = this.formTab1.get('media').value;
    media.forEach((item) => {
        bodyT1.media.push({
          changeValue: item.change ?item.value :this.be64,
          favorite: item.favorite,
          value: item.recovered,
          change: item.change,
          typeExt: item.type,
          type:'img'
        });
  });
  
    const texto_derecha = this.formTab1.get('texto_derecha').value;
    if (texto_derecha) {
      bodyT1.section_simple = texto_derecha
    }

    bodyT1.extras[1].social_networks = [{
      type: 'instagram', value: this.formTab1.get('instagram').value},
      {type: 'linkedin', value:this.formTab1.get('linkedin').value},
      {type: 'whatsapp', value:this.formTab1.get('whatsapp').value}]
      
      this.updateTabForm(bodyT1, this.editId1)
  }

// --------------------------Form Tab 2 ----------------------------------------------
formTab2: UntypedFormGroup;
imgInicial: string;
tarjetasPreview: string[] = [];
personasPreview: string[] = [];
colaboradores: UntypedFormArray;

initFormTab2(){
  this.formTab2 = this.formBuilder.group({
    image: ['', Validators.required],
    recoverImage: [''],
    changeImage:[false],
    typeImg: ['img', Validators.required],
    title: ['', Validators.required],
    description: ['', Validators.required],
    tarjetas: this.formBuilder.array([this.createTarjeta()]),
    colaboradores: this.formBuilder.array([this.createRowText()]),
    personas: this.formBuilder.array([this.createPersona()]),
  });

  this.colaboradores = this.formTab2.get('colaboradores') as UntypedFormArray;
  this.forms.push({ form: this.formTab2, disabled: false });
}

// Preview Imagen título texto --------------------------------------------
uploadInicialT2(event: any) {
  const file = (event.target as HTMLInputElement).files[0];
  
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgInicial = reader.result as string;
      const img = this.imgInicial;
    
      const filename = file.name;
      const fileExt = filename.toLowerCase().split('.').pop() || '';
      const imgType = fileExt;

      // Actualizar los valores del formulario aquí, dentro de reader.onload
      this.formTab2.patchValue({
        image: img,
        typeImg: imgType,
        changeImage: true
      });
      this.formTab2.get('image').updateValueAndValidity();
    };

    reader.readAsDataURL(file);
  } else {
    this.imgInicial = undefined;

    // En el caso del 'else', actualiza los valores del formulario a valores vacíos
    this.formTab2.patchValue({
      // image: this.be64,
      image: '',
      typeImg: 'img',
      changeImage: false
    });
    this.formTab2.get('image').updateValueAndValidity();
  }
}

// Fxs Tabla Tarjetas Giratorias --------------------------------------------------
createTarjeta(): UntypedFormGroup {
  return this.formBuilder.group({
    archivo: [this.be64, Validators.required],
    tipo: ['jpg', Validators.required],
    titulo: ['', Validators.required],
    texto: ['', Validators.required],
    recovered: '',
    change: false
  });
}

getTarjetaControls(): AbstractControl[] {
  return (this.formTab2.get('tarjetas') as UntypedFormArray).controls;
}

previewTableTab2(event: any, index: number) {
  const file = (event.target as HTMLInputElement).files[0];
  const tarjeta = (this.formTab2.get('tarjetas') as UntypedFormArray).at(index);
  
    if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.tarjetasPreview[index] = reader.result as string;
      const img = this.tarjetasPreview[index];
    
      const filename = file.name;
      const fileExt = filename.toLowerCase().split('.').pop() || '';
      const imgType = fileExt;

      // Actualizar los valores del formulario aquí, dentro de reader.onload
      tarjeta.patchValue({
        archivo: img,
        tipo: imgType,
        change: true
      });
      tarjeta.get('archivo').updateValueAndValidity();
    };
    reader.readAsDataURL(file);
  } else {
    this.tarjetasPreview[index] = undefined,
    tarjeta.patchValue({
      archivo: '',
      tipo: '',
      change: false
    });
    tarjeta.get('archivo').updateValueAndValidity();
  }
}

agregarTarjeta() {
  const nuevaTarjeta = this.createTarjeta();
  (this.formTab2.get('tarjetas') as UntypedFormArray).push(nuevaTarjeta);
}

eliminarTarjeta(index: number) {
  const formArray = this.formTab2.get('tarjetas') as UntypedFormArray;
  this.tarjetasPreview.splice(index, 1);

  formArray.removeAt(index);
}

// Fxs Tabla Personas --------------------------------------------------
createPersona(): UntypedFormGroup {
  return this.formBuilder.group({
    archivo: [this.be64, Validators.required],
    tipo: ['jpg', Validators.required],
    titulo: ['', Validators.required],
    texto: ['', Validators.required],
    recovered: '',
    change: false
  });
}

getPersonaControls(): AbstractControl[] {
  return (this.formTab2.get('personas') as UntypedFormArray).controls;
}

previewPersonaTab2(event: any, index: number) {
  const file = (event.target as HTMLInputElement).files[0];
  const personas = (this.formTab2.get('personas') as UntypedFormArray).at(index);
  
    if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.personasPreview[index] = reader.result as string;
      const img = this.personasPreview[index];
    
      const filename = file.name;
      const fileExt = filename.toLowerCase().split('.').pop() || '';
      const imgType = fileExt;

      // Actualizar los valores del formulario aquí, dentro de reader.onload
      personas.patchValue({
        archivo: img,
        tipo: imgType,
        change: true
      });
      personas.get('archivo').updateValueAndValidity();
    };
    reader.readAsDataURL(file);
  } else {
    this.personasPreview[index] = undefined,
    personas.patchValue({
      archivo: '',
      tipo: '',
      change: false
    });
    personas.get('archivo').updateValueAndValidity();
  }
}

agregarPersona() {
  const nuevaPersona = this.createPersona();
  (this.formTab2.get('personas') as UntypedFormArray).push(nuevaPersona);
}

eliminarPersona(index: number) {
  const formArray = this.formTab2.get('personas') as UntypedFormArray;

  // Eliminar el elemento correspondiente de mediaPreview
  this.personasPreview.splice(index, 1);

  // Eliminar el control del FormArray
  formArray.removeAt(index);
}

// Enviar Tab 2 ----------------------------------------------------

enviarTableT2(){

  const bodyT2 = {
    company_id: parseInt(this.id_company, 10),
    value: "page02",
    page_id: 34,
    media:[],
    section_simple:[],
    section_img: [],
    extras: [
      { title: 'Profesionales',
        profesion: [] }, {
          card_rotation: []
        }
    ]
  };

  bodyT2.extras[0].profesion =this.formTab2.get('colaboradores').value; 
  bodyT2.section_img.push({
    title: this.formTab2.get('title').value,
    description: this.formTab2.get('description').value,
    value: this.formTab2.get('image').value,
    typeExt: this.formTab2.get('typeImg').value,
    type: 'img',
  })

  const tarjetas = this.formTab2.get('tarjetas').value;
  tarjetas.forEach((item) => {
    bodyT2.extras[1].card_rotation.push({
      title: item.titulo,
      description: item.texto,
      value: item.archivo,
      typeExt: item.tipo,
      type: 'img',
    });
  });

  const personas = this.formTab2.get('personas').value;
  personas.forEach((item) => {
    bodyT2.section_img.push({
      title: item.titulo,
      description: item.texto,
      value: item.archivo,
      typeExt: item.tipo,
      type: 'img',
    });
  });

  this.sendTabForm(this.formTab2, bodyT2)
}

editarTableT2() {
  const bodyT2 = {
    company_id: parseInt(this.id_company, 10),
    value: "page02",
    page_id: 34,
    media:[],
    section_simple:[],
    section_img: [],
    extras: [
      { title: 'Profesionales',
        profesion: [] }, {
          card_rotation: []
        }
    ]
  };

  bodyT2.extras[0].profesion =this.formTab2.get('colaboradores').value; 
  bodyT2.section_img.push({
    title: this.formTab2.get('title').value,
    description: this.formTab2.get('description').value,
    value: this.formTab2.get('recoverImage').value,
    changeValue: (this.formTab2.get('changeImage').value) ?this.formTab2.get('image').value :this.be64,
    change: this.formTab2.get('changeImage').value, 
    typeExt: (this.formTab2.get('changeImage').value) ?this.formTab2.get('typeImg').value :'jpg',
    type: 'img',
  })

  const tarjetas = this.formTab2.get('tarjetas').value;
  tarjetas.forEach((item) => {
    bodyT2.extras[1].card_rotation.push({
      title: item.titulo,
      description: item.texto,
      value: item.recovered,
      typeExt: item.change ?item.tipo :'jpg',
      type: 'img',
      change: item.change,
      changeValue:  item.change ?item.archivo :this.be64,
    });
  });

  const personas = this.formTab2.get('personas').value;
  personas.forEach((item) => {
    bodyT2.section_img.push({
      title: item.titulo,
      description: item.texto,
      value: item.recovered,
      typeExt: item.change ?item.tipo :'jpg',
      type: 'img',
      change: item.change,
      changeValue: item.change ?item.archivo :this.be64,
    });
  });

  this.updateTabForm(bodyT2, this.editId2)
}

//------------------- Form Tab 3 ---------------------------------------

formTab3: UntypedFormGroup;
imgHitos: string;
tarjetasHitos: UntypedFormArray;

imgValores: string;
tarjetasValores: UntypedFormArray;

imgEngagement: string;
tarjetasEngagement: UntypedFormArray;


initFormTab3(){
  this.formTab3 = this.formBuilder.group({
    changeH: '',
    recoverH: '',
    changeV: '',
    recoverV: '',
    changeE: '',
    recoverE: '',
    imgHitos: ['', Validators.required],
    typeHitos: ['', Validators.required],
    titleHitos: ['', Validators.required],
    descriptionHitos: ['', Validators.required],
    imgValores: ['', Validators.required],
    typeValores: ['', Validators.required],
    titleValores: ['', Validators.required],
    descriptionValores: ['', Validators.required],
    imgEngagement: ['', Validators.required],
    typeEngagement: ['', Validators.required],
    titleEngagement: ['', Validators.required],
    descriptionEngagement: ['', Validators.required],
    tarjetasHitos: this.formBuilder.array([this.createRowText()]),
    tarjetasValores: this.formBuilder.array([this.createRowText()]),
    tarjetasEngagement: this.formBuilder.array([this.createRowText()]),
  });

  this.tarjetasHitos = this.formTab3.get('tarjetasHitos') as UntypedFormArray;
  this.tarjetasValores = this.formTab3.get('tarjetasValores') as UntypedFormArray;
  this.tarjetasEngagement = this.formTab3.get('tarjetasEngagement') as UntypedFormArray;

  this.forms.push({ form: this.formTab3, disabled: false });
}

// Preview Imagen Hitos --------------------------------------------
previewHitos(event: any) {
  const file = (event.target as HTMLInputElement).files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgHitos = reader.result as string;
      const img = this.imgHitos;
    
      const filename = file.name;
      const fileExt = filename.toLowerCase().split('.').pop() || '';
      const imgType = fileExt;

      // Actualizar los valores del formulario aquí, dentro de reader.onload
      this.formTab3.patchValue({
        imgHitos: img,
        typeHitos: imgType,
        changeH: true
      });
      this.formTab3.get('imgHitos').updateValueAndValidity();
    };

    reader.readAsDataURL(file);
  } else {
    this.imgHitos = undefined;

    // En el caso del 'else', actualiza los valores del formulario a valores vacíos
    this.formTab3.patchValue({
      imgHitos: '',
      typeHitos: '',
      changeH: false
    });
    this.formTab3.get('imgHitos').updateValueAndValidity();
  }
}

// Preview Imagen Valores --------------------------------------------
previewValores(event: any) {
  const file = (event.target as HTMLInputElement).files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgValores = reader.result as string;
      const img = this.imgValores;
    
      const filename = file.name;
      const fileExt = filename.toLowerCase().split('.').pop() || '';
      const imgType = fileExt;

      // Actualizar los valores del formulario aquí, dentro de reader.onload
      this.formTab3.patchValue({
        imgValores: img,
        typeValores: imgType,
        changeV: true
      });
      this.formTab3.get('imgValores').updateValueAndValidity();
    };

    reader.readAsDataURL(file);
  } else {
    this.imgValores = undefined;

    // En el caso del 'else', actualiza los valores del formulario a valores vacíos
    this.formTab3.patchValue({
      imgValores: '',
      typeValores: '',
      changeV: false
    });
    this.formTab3.get('imgValores').updateValueAndValidity();
  }
}

// Preview Imagen Engagement --------------------------------------------
previewEngagement(event: any) {
  const file = (event.target as HTMLInputElement).files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgEngagement = reader.result as string;
      const img = this.imgEngagement;
    
      const filename = file.name;
      const fileExt = filename.toLowerCase().split('.').pop() || '';
      const imgType = fileExt;

      // Actualizar los valores del formulario aquí, dentro de reader.onload
      this.formTab3.patchValue({
        imgEngagement: img,
        typeEngagement: imgType,
        changeE: true
      });
      this.formTab3.get('imgEngagement').updateValueAndValidity();
    };

    reader.readAsDataURL(file);
  } else {
    this.imgEngagement = undefined;

    // En el caso del 'else', actualiza los valores del formulario a valores vacíos
    this.formTab3.patchValue({
      imgEngagement: '',
      typeEngagement: '',
      changeE: false
    });
    this.formTab3.get('imgEngagement').updateValueAndValidity();
  }
}

// Eviar Tab 3 -----------------------------------------------------

enviarTableT3(){
  const bodyT3 = {
    value: "page03",
    company_id: parseInt(this.id_company, 10),
    page_id: 35,
    media:[],
    section_img: [],
    section_simple: [],
    extras: [
      { hitos: [] }, { valores: [] }
    ]
  };

  bodyT3.extras[0].hitos =this.formTab3.get('tarjetasHitos').value; 
  bodyT3.extras[1].valores =this.formTab3.get('tarjetasValores').value;
  bodyT3.section_simple = this.formTab3.get('tarjetasEngagement').value;

  bodyT3.section_img.push({
    title: this.formTab3.get('titleHitos').value,
    description: this.formTab3.get('descriptionHitos').value,
    value: this.formTab3.get('imgHitos').value,
    typeExt: this.formTab3.get('typeHitos').value,
    type: 'img',
  })

  bodyT3.section_img.push({
    title: this.formTab3.get('titleValores').value,
    description: this.formTab3.get('descriptionValores').value,
    value: this.formTab3.get('imgValores').value,
    typeExt: this.formTab3.get('typeValores').value,
    type: 'img',
  })

  bodyT3.section_img.push({
    title: this.formTab3.get('titleEngagement').value,
    description: this.formTab3.get('descriptionEngagement').value,
    value: this.formTab3.get('imgEngagement').value,
    typeExt: this.formTab3.get('typeEngagement').value,
    type: 'img',
  })

  this.sendTabForm(this.formTab3, bodyT3)
}

editarTableT3() {
  const bodyT3 = {
    value: "page03",
    company_id: parseInt(this.id_company, 10),
    page_id: 35,
    media:[],
    section_img: [],
    section_simple: [],
    extras: [
      { hitos: [] }, { valores: [] }
    ]
  };

  bodyT3.extras[0].hitos =this.formTab3.get('tarjetasHitos').value; 
  bodyT3.extras[1].valores =this.formTab3.get('tarjetasValores').value;
  bodyT3.section_simple = this.formTab3.get('tarjetasEngagement').value;

  bodyT3.section_img.push({
    title: this.formTab3.get('titleHitos').value,
    description: this.formTab3.get('descriptionHitos').value,
    value: this.formTab3.get('recoverH').value,
    typeExt:(this.formTab3.get('changeH').value) ?this.formTab3.get('typeHitos').value :'jpg',
    type: 'img',
    changeValue: (this.formTab3.get('changeH').value) ?this.formTab3.get('imgHitos').value :this.be64,
    change: this.formTab3.get('changeH').value,
  })

  bodyT3.section_img.push({
    title: this.formTab3.get('titleValores').value,
    description: this.formTab3.get('descriptionValores').value,
    value: this.formTab3.get('recoverV').value,
    typeExt:(this.formTab3.get('changeV').value) ?this.formTab3.get('typeValores').value :'jpg',
    type: 'img',
    changeValue:(this.formTab3.get('changeV').value) ?this.formTab3.get('imgValores').value :this.be64,
    change: this.formTab3.get('changeV').value,
  })

  bodyT3.section_img.push({
    title: this.formTab3.get('titleEngagement').value,
    description: this.formTab3.get('descriptionEngagement').value,
    value: this.formTab3.get('recoverE').value,
    typeExt:(this.formTab3.get('changeE').value) ?this.formTab3.get('typeEngagement').value :'jpg',
    type: 'img',
    changeValue: (this.formTab3.get('changeE').value) ?this.formTab3.get('imgEngagement').value :this.be64,
    change: this.formTab3.get('changeE').value,
  })

  this.updateTabForm(bodyT3, this.editId3)
}
// ----------------------- From Tab 4 ------------------------------

formTab4: UntypedFormGroup;

tarjetasVentajas: UntypedFormArray;
imgCrecimiento: string;
imgEquipo: string;

initFormTab4(){
  this.formTab4 = this.formBuilder.group({
    recoverC: '',
    changeC: '',
    recoverE: '',
    changeE: '',
    imgCrecimiento: ['', Validators.required],
    typeCrecimiento: ['', Validators.required],
    titleCrecimiento: ['', Validators.required],
    descriptionCrecimiento: ['', Validators.required],
    imgEquipo: ['', Validators.required],
    typeEquipo: ['', Validators.required],
    titleEquipo: ['', Validators.required],
    descriptionEquipo: ['', Validators.required],
    tarjetasVentajas: this.formBuilder.array([this.createRowText()]),
    });

  this.tarjetasVentajas = this.formTab4.get('tarjetasVentajas') as UntypedFormArray;

  this.forms.push({ form: this.formTab4, disabled: false });  
}

// Preview Imagen Crecimiento --------------------------------------------
previewCrecimiento(event: any) {
  const file = (event.target as HTMLInputElement).files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgCrecimiento = reader.result as string;
      const img = this.imgCrecimiento;
    
      const filename = file.name;
      const fileExt = filename.toLowerCase().split('.').pop() || '';
      const imgType = fileExt;

      // Actualizar los valores del formulario aquí, dentro de reader.onload
      this.formTab4.patchValue({
        imgCrecimiento: img,
        typeCrecimiento: imgType,
        changeC: true
      });
      this.formTab4.get('imgCrecimiento').updateValueAndValidity();
    };

    reader.readAsDataURL(file);
  } else {
    this.imgCrecimiento = undefined;

    // En el caso del 'else', actualiza los valores del formulario a valores vacíos
    this.formTab4.patchValue({
      imgCrecimiento: '',
      typeCrecimiento: '',
      changeC: false
    });
    this.formTab4.get('imgCrecimiento').updateValueAndValidity();
  }
}

// Preview Imagen Equipo --------------------------------------------
previewEquipo(event: any) {
  const file = (event.target as HTMLInputElement).files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgEquipo = reader.result as string;
      const img = this.imgEquipo;
    
      const filename = file.name;
      const fileExt = filename.toLowerCase().split('.').pop() || '';
      const imgType = fileExt;

      // Actualizar los valores del formulario aquí, dentro de reader.onload
      this.formTab4.patchValue({
        imgEquipo: img,
        typeEquipo: imgType,
        changeE: true
      });
      this.formTab4.get('imgEquipo').updateValueAndValidity();
    };

    reader.readAsDataURL(file);
  } else {
    this.imgEquipo = undefined;

    // En el caso del 'else', actualiza los valores del formulario a valores vacíos
    this.formTab4.patchValue({
      imgEquipo: '',
      typeEquipo: 'img',
      changeE: false
    });
    this.formTab4.get('imgEquipo').updateValueAndValidity();
  }
}

// Eviar Tab 4 -----------------------------------------------------

enviarTableT4(){

  const bodyT4 = {
    value: "page04",
    company_id: parseInt(this.id_company, 10),
    page_id: 36,
    media: [],
    extras: [],
    section_img: [],
    section_simple: [{ title: 'Ventajas', ventajas: [] }],
  };

  bodyT4.section_simple[0].ventajas = this.formTab4.get('tarjetasVentajas').value; 
  

  bodyT4.section_img.push({
    title: this.formTab4.get('titleCrecimiento').value,
    description: this.formTab4.get('descriptionCrecimiento').value,
    value: this.formTab4.get('imgCrecimiento').value,
    typeExt: this.formTab4.get('typeCrecimiento').value,
    type: 'img',
  })

  bodyT4.section_img.push({
    title: this.formTab4.get('titleEquipo').value,
    description: this.formTab4.get('descriptionEquipo').value,
    value: this.formTab4.get('imgEquipo').value,
    typeExt: this.formTab4.get('typeEquipo').value,
    type: 'img',
  })

  this.sendTabForm(this.formTab4, bodyT4)
}

editarTableT4() {

  const bodyT4 = {
    value: "page04",
    company_id: parseInt(this.id_company, 10),
    page_id: 36,
    media: [],
    extras: [],
    section_img: [],
    section_simple: [{ title: 'Ventajas', ventajas: [] }],
  };

  bodyT4.section_simple[0].ventajas = this.formTab4.get('tarjetasVentajas').value; 
  

  bodyT4.section_img.push({
    title: this.formTab4.get('titleCrecimiento').value,
    description: this.formTab4.get('descriptionCrecimiento').value,
    value: this.formTab4.get('recoverC').value,
    typeExt: (this.formTab4.get('changeC').value) ?this.formTab4.get('typeCrecimiento').value :'jpg',
    type: 'img',
    changeValue: (this.formTab4.get('changeC').value) ?this.formTab4.get('imgCrecimiento').value :this.be64,
    change: this.formTab4.get('changeC').value,
  })

  bodyT4.section_img.push({
    title: this.formTab4.get('titleEquipo').value,
    description: this.formTab4.get('descriptionEquipo').value,
    value: this.formTab4.get('recoverE').value,
    typeExt: (this.formTab4.get('changeE').value) ?this.formTab4.get('typeEquipo').value :'jpg',
    type: 'img',
    changeValue: (this.formTab4.get('changeE').value) ?this.formTab4.get('imgEquipo').value :this.be64,
    change: this.formTab4.get('changeE').value,
  })

  this.updateTabForm(bodyT4, this.editId4)
}

updateTabForm(body, id){
  this.loadingTab = true;
  this._sClient.updatePage(body, id).subscribe(
    (res) => {
      this.toastr.success(
        "Cambio realizado",
        "La información se envió con éxito!",
        {
          timeOut: environment.timeOutmessage,
          closeButton: true,
          progressBar: true,
        }
      );
      this.reloadPage()

    },
    (error) => {
      console.log('ERROR',error);
      this.toastr.error(
        "Error al enviar los datos.",
        "Ya existe información en esta página.",
        {
          timeOut: environment.timeOutmessage,
          closeButton: true,
          progressBar: true,
        }
      );
      this.loadingTab = false;
    }
  )

}

sendTabForm(formName, body){
  this.loadingTab = true;
  if (formName.valid) {
      this._sClient.sendInfo(body).subscribe(
      (res) => {
        this.toastr.success(
          "Cambio realizado",
          "La información se envió con éxito!",
          {
            timeOut: environment.timeOutmessage,
            closeButton: true,
            progressBar: true,
          }
        );

        this.reloadPage()
      },
      (error) => {
        console.log('ERROR',error);
        this.toastr.error(
          "Error al enviar los datos.",
          "Ya existe información en esta página.",
          {
            timeOut: environment.timeOutmessage,
            closeButton: true,
            progressBar: true,
          }
        );
        this.loadingTab = false;
      }
    )
  } else {
    this.toastr.error(
              "Error al enviar los datos.",
              "Revisar que los campos estén comletos.",
              {
                timeOut: environment.timeOutmessage,
                closeButton: true,
                progressBar: true,
              }
            );
            this.loadingTab = false;
  }
}

reloadPage() {
  window.location.reload();
}


}









