import { Routes } from "@angular/router";
import { MasterCSVFileComponent } from "./views/pages/master-csvfile/master-csvfile";

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
