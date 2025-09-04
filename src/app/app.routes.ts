import { Routes } from "@angular/router";
import { AuthLayoutComponent } from "./shared/components/layouts/auth-layout/auth-layout.component";

export const routes: Routes = [
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
  // {
  //   path: "",
  //   component: BlankLayoutComponent,
  //   children: [
  //     {
  //       path: "others",
  //       loadChildren: () =>
  //         import("./views/others/others.module").then((m) => m.OthersModule),
  //     },
  //   ],
  // },
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
