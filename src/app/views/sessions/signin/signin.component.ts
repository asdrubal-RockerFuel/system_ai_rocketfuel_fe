import { Component, OnInit } from "@angular/core";
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { AuthService } from "../../../shared/services/auth.service";
import {
  Router,
  RouteConfigLoadStart,
  ResolveStart,
  RouteConfigLoadEnd,
  ResolveEnd,
} from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { forkJoin } from "rxjs";
import { NavigationService } from "../../../shared/services/navigation.service";
import { RolService } from "../../../shared/services/rol.service";
import { environment } from "../../../../environments/environment";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class SigninComponent implements OnInit {
  loading: boolean = false;
  loadingText: string = "Iniciar Sesión";
  signinForm!: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private toastr: ToastrService,
    private auth: AuthService,
    private navigationService: NavigationService,
    private router: Router,
    private _sRol: RolService
  ) {}

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
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
  text = "Iniciar Sesión";
  valor = false;

  asignarDataUser(id: number, rol: number, userData: any) {
    this._sRol.setId(id);
    this._sRol.setR(rol);
    this._sRol.setData(userData);
  }
  signin() {
    this.text = "Cargando...";
    this.valor = true;
    this.auth.normalLogin(this.signinForm.value).subscribe(
      (res) => {
        localStorage.setItem("pucoToken", res["data"]);
        /*      this.router.navigate(["/pages/maestro-usuarios"]);
        this.navigationService.chooseMenuItems();  */

        // this.auth.obtieneModulos();
        // this.auth.obtenerDatosAdmin().subscribe(
        //   (userResponse: any) => {
        //     console.log(userResponse);
        //     let dataUser = userResponse.data;
        //     localStorage.setItem(
        //       "nombreCompleto",
        //       (dataUser.name !== null ? dataUser.name : "") +
        //         " " +
        //         (dataUser.paternal_lastname !== null
        //           ? dataUser.paternal_lastname
        //           : "") +
        //         " " +
        //         (dataUser.maternal_lastname !== null
        //           ? dataUser.maternal_lastname
        //           : "")
        //     );

        //     localStorage.setItem(
        //       "idUser",
        //       dataUser.id !== null ? dataUser.id : ""
        //     );
        //     this.router.navigate(["/pages/maestro-usuarios"]);
        //     /*  const encodedData = btoa(userResponse.type_user); // encode a string

        //     localStorage.setItem("rol", encodedData); */

        //     /*  this.asignarDataUser(
        //       +dataUser.id,
        //       +userResponse.type_user,
        //       dataUser
        //     );
        //     this.navigationService.chooseMenuItems(userResponse.type_user); */
        //     this.valor = false;

        //     /*    if (userResponse.type_user == "admin") {
        //       this.router.navigate(["/pages/maestro-cotizaciones"]);
        //     } else if (userResponse.type_user == "client") {
        //       this.router.navigate(["/pages/profile"]);
        //     } else if (userResponse.type_user == "viewer_client") {
        //       this.router.navigate(["/pages/maestro-cotizaciones"]);
        //     } else if (userResponse.type_user == "super_admin") {
        //       this.router.navigate(["/pages/maestro-cotizaciones"]);
        //     } */
        //   },
        //   (error) => {
        //     this.toastr.error(
        //       error.error.message,
        //       "El proceso no pude realizarse ",
        //       {
        //         timeOut: environment.timeOutmessage,
        //         closeButton: true,
        //         progressBar: true,
        //       }
        //     );
        //   }
        // );

        /* Uso de forkJoin para emitir un valor cuando ambos se hayan cargadp */
        forkJoin([
          this.auth.obtieneModulos2(), // 0
          this.auth.obtenerDatosAdmin(), // 1
        ]).subscribe(
          (response: any) => {
            const modulos = response[0].data;
            const userResponse = response[1];

            sessionStorage.setItem("modulesData", JSON.stringify(modulos));

            console.log(userResponse);
            let dataUser = userResponse.data;
            localStorage.setItem(
              "nombreCompleto",
              (dataUser.name !== null ? dataUser.name : "") +
                " " +
                (dataUser.paternal_lastname !== null
                  ? dataUser.paternal_lastname
                  : "") +
                " " +
                (dataUser.maternal_lastname !== null
                  ? dataUser.maternal_lastname
                  : "")
            );

            localStorage.setItem("email", btoa(dataUser.email));

            localStorage.setItem(
              "idUser",
              dataUser.id !== null ? dataUser.id : ""
            );
            this.router.navigate(["/pages/csv-file"]);
            /*  const encodedData = btoa(userResponse.type_user); // encode a string

              localStorage.setItem("rol", encodedData); */

            /*  this.asignarDataUser(
                +dataUser.id,
                +userResponse.type_user,
                dataUser
              );
              this.navigationService.chooseMenuItems(userResponse.type_user); */
            this.valor = false;

            /*    if (userResponse.type_user == "admin") {
                this.router.navigate(["/pages/maestro-cotizaciones"]);
              } else if (userResponse.type_user == "client") {
                this.router.navigate(["/pages/profile"]);
              } else if (userResponse.type_user == "viewer_client") {
                this.router.navigate(["/pages/maestro-cotizaciones"]);
              } else if (userResponse.type_user == "super_admin") {
                this.router.navigate(["/pages/maestro-cotizaciones"]);
              } */
          },
          (error) => {
            this.toastr.error(
              error?.error?.message,
              "El proceso no pude realizarse ",
              {
                timeOut: environment.timeOutmessage,
                closeButton: true,
                progressBar: true,
              }
            );
          }
        );
      },
      (error) => {
        this.text = "Iniciar Sesión";
        this.valor = false;
        if (error.error.errors != undefined) {
          let simple = error.error.errors.map((res: { msg: any }) => {
            console.log(res, "ss");
            return res.msg;
          });

          this.toastr.error(simple, "El proceso no pude realizarse ", {
            timeOut: environment.timeOutmessage,
            closeButton: true,
            progressBar: true,
          });
        } else {
          this.text = "Iniciar Sesión";
          this.valor = false;
          this.toastr.error(
            error.error.message,
            "El proceso no pude realizarse ",
            {
              timeOut: environment.timeOutmessage,
              closeButton: true,
              progressBar: true,
            }
          );
        }
      }

      /*    localStorage.setItem("pucoToken", res.JWT);
        this.text = "Inicio de sesión exitoso...";
        this.router.navigate(["/pages/maestro-cotizaciones"]);
        this.valor = false; */
    );
  }
}
