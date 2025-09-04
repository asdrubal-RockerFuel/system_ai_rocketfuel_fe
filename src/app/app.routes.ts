import { Routes } from "@angular/router";
import { MasterCSVFileComponent } from "./views/sessions/master-csvfile/master-csvfile.component";

export const routes: Routes = [
  {
    path: "",
    component: MasterCSVFileComponent,
  },
  {
    path: "**",
    redirectTo: "",
  },
];
