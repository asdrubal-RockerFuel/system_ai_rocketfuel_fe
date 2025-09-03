import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PagesRoutingModule } from "./pages-routing.module";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MaestroUsuarioComponent } from "./maestro-usuario/maestro-usuario.component";
import { MaestroServiciosAdicionalesComponent } from "./maestro-servicios-adicionales/maestro-servicios-adicionales.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { MiPerfilComponent } from "./mi-perfil/mi-perfil.component";
import { NgbAccordionModule } from "@ng-bootstrap/ng-bootstrap";
import { DragDropModule } from "@angular/cdk/drag-drop";

import { MatExpansionModule } from "@angular/material/expansion";
import { MatTabsModule } from '@angular/material/tabs';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
// import { SharedPipesModule } from "src/app/shared/pipes/shared-pipes.module";
import { MaestroOficinaComponent } from "./maestro-oficinas/maestro-oficina.component";
import { MaestroProgramComponent } from "./maestro-programa/maestro-programa.component";
import { MaestroAreaComponent } from "./maestro-area/maestro-area.component";
import { MaestroModuloComponent } from "./maestro-modulo/maestro-modulo.component";
import { MaestroRolComponent } from "./maestro-rol/maestro-rol.component";
import { PermisesModulesComponent } from "./maestro-rol/permises-modules/permises-modules.component";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { MaestroProveedoresComponent } from './maestro-proveedores/maestro-proveedores.component';
import { MaestroRequerimientosComponent } from './maestro-requerimientos/maestro-requerimientos.component';
import { RequerimientoComponent } from './maestro-requerimientos/requerimiento/requerimiento.component';
import { ProveedoresModuleComponent } from './maestro-proveedores/proveedores-module/proveedores-module.component';
import { MaestroBandejaComponent } from './maestro-bandeja/maestro-bandeja.component';
import { CustomMultiSelectComponent } from './maestro-usuario/custom-multi-select/custom-multi-select.component';
import { SharedPipesModule } from "../../shared/pipes/shared-pipes.module";
import { SharedComponentsModule } from "../../shared/components/shared-components.module";
import { FormWizardModule } from "../../shared/components/form-wizard/form-wizard.module";

@NgModule({
  imports: [
    SharedPipesModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatCardModule,
    CommonModule,
    DragDropModule,
    AngularMultiSelectModule,
    NgbAccordionModule,
    NgbModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    PagesRoutingModule,
    SharedComponentsModule,
    FormWizardModule,
    MatTabsModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  declarations: [],
})
export class PagesModule { }
