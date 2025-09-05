import { Component, OnInit, inject } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  ReactiveFormsModule,
  NonNullableFormBuilder,
} from "@angular/forms";
import {
  Router,
  RouteConfigLoadStart,
  ResolveStart,
  RouteConfigLoadEnd,
  ResolveEnd,
} from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { forkJoin, switchMap, tap } from "rxjs";
import { CommonModule } from "@angular/common";

import { AuthService } from "../../../shared/services/auth.service";
import { NavigationService } from "../../../shared/services/navigation.service";
import { environment } from "src/environments/environment";
import { RolService } from "../../../shared/services/rol.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class SigninComponent implements OnInit {
  loading = false;
  loadingText = "Iniciar Sesión";
  signinForm!: UntypedFormGroup;
  text = "Iniciar Sesión";
  valor = false;

  private fb = inject(UntypedFormBuilder);
  private toastr = inject(ToastrService);
  private auth = inject(AuthService);
  private navigationService = inject(NavigationService);
  private router = inject(Router);
  private _sRol = inject(RolService);

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (
        event instanceof RouteConfigLoadStart ||
        event instanceof ResolveStart
      ) {
        this.loadingText = "Acceso concedido...";
        this.loading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.loading = false;
      }
    });

    this.signinForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  asignarDataUser(id: number, rol: number, userData: any) {
    this._sRol.setId(id);
    this._sRol.setRole(rol);
    this._sRol.setData(userData);
  }

  signin() {
    if (this.signinForm.invalid) return;

    this.text = "Cargando...";
    this.valor = true;

    this.auth
      .normalLogin(this.signinForm.value)
      .pipe(
        switchMap((res) => {
          localStorage.setItem("pucoToken", res.data);
          return forkJoin([
            this.auth.obtieneModulos2(),
            this.auth.obtenerDatosAdmin(),
          ]);
        }),
        tap(([modulosRes, userResponse]: any) => {
          const modulos = modulosRes.data;
          const dataUser = userResponse.data;

          sessionStorage.setItem("modulesData", JSON.stringify(modulos));

          localStorage.setItem(
            "nombreCompleto",
            `${dataUser.name ?? ""} ${dataUser.paternal_lastname ?? ""} ${
              dataUser.maternal_lastname ?? ""
            }`
          );

          localStorage.setItem("email", btoa(dataUser.email));
          localStorage.setItem("idUser", dataUser.id?.toString() ?? "");

          this.router.navigate(["/pages/csv-file"]);
        })
      )
      .subscribe({
        next: () => {
          this.valor = false;
          this.text = "Iniciar Sesión";
        },
        error: (error) => {
          this.valor = false;
          this.text = "Iniciar Sesión";

          if (error.error?.errors) {
            const messages = error.error.errors.map((e: any) => e.msg);
            this.toastr.error(messages, "El proceso no pudo realizarse", {
              timeOut: environment.timeOutmessage,
              closeButton: true,
              progressBar: true,
            });
          } else {
            this.toastr.error(
              error.error?.message ?? "Error desconocido",
              "El proceso no pudo realizarse",
              {
                timeOut: environment.timeOutmessage,
                closeButton: true,
                progressBar: true,
              }
            );
          }
        },
      });
  }
}
