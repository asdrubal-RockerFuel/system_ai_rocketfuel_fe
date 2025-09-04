import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthLayoutComponent } from "./shared/components/layouts/auth-layout/auth-layout.component";
import { AuthGaurd } from "./shared/services/auth.gaurd";

const adminRoutes: Routes = [
  {
    path: "pages",
    loadChildren: () =>
      import("./views/pages/pages.module").then((m) => m.PagesModule),
  },
];

const routes: Routes = [
  {
    path: "",
    redirectTo: "sessions/csv-file",
    pathMatch: "full",
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "sessions",
        loadChildren: () =>
          import("./views/sessions/sessions.module").then(
            (m) => m.SessionsModule
          ),
      },
    ],
  },
  {
    path: "",
    component: BlankLayoutComponent,
    children: [
      {
        path: "others",
        loadChildren: () =>
          import("./views/others/others.module").then((m) => m.OthersModule),
      },
    ],
  },
  // {
  //   path: '',
  //   component: AdminLayoutSidebarLargeComponent,
  //   canActivate: [AuthGaurd],
  //   children: adminRoutes
  // },
  {
    path: "**",
    redirectTo: "others/404",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
