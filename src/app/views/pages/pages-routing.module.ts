import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MaestroProductosComponent } from "./maestro-productos/maestro-productos.component";
import { MaestroServiciosAdicionalesComponent } from "./maestro-servicios-adicionales/maestro-servicios-adicionales.component";
// import { UserProfileComponent } from "./user-profile/user-profile.component";
import { MaestroUsuarioComponent } from "./maestro-usuario/maestro-usuario.component";
import { MiPerfilComponent } from "./mi-perfil/mi-perfil.component";

import { MaestroOficinaComponent } from "./maestro-oficinas/maestro-oficina.component";
import { MaestroProgramComponent } from "./maestro-programa/maestro-programa.component";
import { MaestroAreaComponent } from "./maestro-area/maestro-area.component";
import { MaestroModuloComponent } from "./maestro-modulo/maestro-modulo.component";
import { MaestroRolComponent } from "./maestro-rol/maestro-rol.component";
import { PermisesModulesComponent } from "./maestro-rol/permises-modules/permises-modules.component";
import { MaestroProveedoresComponent } from "./maestro-proveedores/maestro-proveedores.component";
import { MaestroRequerimientosComponent } from "./maestro-requerimientos/maestro-requerimientos.component";
import { ProveedoresModuleComponent } from "./maestro-proveedores/proveedores-module/proveedores-module.component";
import { MaestroBandejaComponent } from "./maestro-bandeja/maestro-bandeja.component";
import { RequerimientoComponent } from "./maestro-requerimientos/requerimiento/requerimiento.component";
import { MasterCSVFileComponent } from "../sessions/master-csvfile/master-csvfile.component";


const routes: Routes = [
  {
    path: "maestro-usuarios",
    component: MaestroUsuarioComponent,
  },
  {
    path: "csv-file",
    component: MasterCSVFileComponent,
    // },
    // {
    //   path: "maestro-oficina",
    //   component: MaestroOficinaComponent,
    // },
    // {
    //   path: "maestro-programa",
    //   component: MaestroProgramComponent,
    // },
    // {
    //   path: "maestro-area",
    //   component: MaestroAreaComponent,
    // },
    // {
    //   path: "modulo-proveedor",
    //   component: ProveedoresModuleComponent
    // },
    // {
    //   path: "maestro-proveedores",
    //   component: MaestroProveedoresComponent,
    // },
    // {
    //   path: "modulo-proveedor/:id",
    //   component: ProveedoresModuleComponent
    // },
    // {
    //   path: "maestro-requerimientos",
    //   component: MaestroRequerimientosComponent,
    // },
    // {
    //   path: "maestro-requerimientos/new",
    //   component: RequerimientoComponent,
    // },
    // {
    //   path: "maestro-requerimientos/edit/:id",
    //   component: RequerimientoComponent,
    // },
    // {
    //   path: "maestro-requerimientos/review/:id",
    //   component: RequerimientoComponent,
    // },
    // {
    //   path: "bandeja-entrada",
    //   component: MaestroBandejaComponent,
    // },
    // { path: "maestro-modulo", component: MaestroModuloComponent },
    // { path: "maestro-rol", component: MaestroRolComponent },
    // { path: "maestro-permisos/:id", component: PermisesModulesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
