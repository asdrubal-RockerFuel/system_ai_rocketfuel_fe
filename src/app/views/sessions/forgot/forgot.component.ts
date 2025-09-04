import { Component, OnInit } from "@angular/core";
// import { SharedAnimations } from "src/app/shared/animations/shared-animations";
// import { environment } from "src/environments/environment";
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../../../shared/services/auth.service";
import { SharedAnimations } from "../../../shared/animations/shared-animations";
import { environment } from "../../../../environments/environment";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-forgot",
  templateUrl: "./forgot.component.html",
  styleUrls: ["./forgot.component.scss"],
  animations: [SharedAnimations],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ForgotComponent implements OnInit {
  signinForm!: UntypedFormGroup;
  passForm!: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,

    private router: Router,
    private _loginService: AuthService
  ) {}

  ngOnInit() {
    this.signinForm = this.fb.group({
      email: ["", Validators.required],
    });
    this.passForm = this.fb.group({
      password: ["", Validators.required],
    });
  }
  Exp = false;
  ExpC: any;
  Exps: any;
  disableBtn: any;
  submitLoginForm() {
    this.disableBtn = true;
    this._loginService
      .forgotPassword(this.signinForm?.get("email")?.value)
      .subscribe(
        (response: any) => {
          const encodedData = btoa(this.signinForm?.get("email")?.value); // encode a string

          localStorage.setItem("email", encodedData);

          this.toastr.success("Correo enviado", "Verifica tu código ", {
            timeOut: environment.timeOutmessage,
            closeButton: true,
            progressBar: true,
          });
          this.Exp = true;
          this.ExpC = true;
          this.disableBtn = false;
        },
        (error) => {
          if (error.error.errors != undefined) {
            let simple = error.error.errors.map((res: any) => {
              console.log(res, "ss");
              return res.msg;
            });
            this.disableBtn = false;
            this.toastr.error(simple, "El proceso no pude realizarse ", {
              timeOut: environment.timeOutmessage,
              closeButton: true,
              progressBar: true,
            });
          } else {
            this.disableBtn = false;
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
      );
  }

  onCodeCompleted(code: string) {
    this.codigo = code;
  }
  onCodeChanged(code: string) {}
  codigo: string = "";

  entraForm() {
    if (!this.codigo) {
      this.toastr.success(
        "No ha Ingresado un codigo válido",
        "Verifica tu código ",
        {
          timeOut: environment.timeOutmessage,
          closeButton: true,
          progressBar: true,
        }
      );
    }
    const decodedData = atob(localStorage.getItem("email") ?? "");
    let data = {
      email: decodedData,
      verificationCode: this.codigo,
    };

    this._loginService.verifyCode(decodedData, this.codigo).subscribe(
      (response: any) => {
        const encodedDataCode = btoa(this.codigo); // encode a string

        localStorage.setItem("code", encodedDataCode);
        this.Exps = true;
        this.Exp = false;
        this.toastr.success(
          "Código de verificación correcto",
          "Ingresa tu nueva contraseña",
          {
            timeOut: environment.timeOutmessage,
            closeButton: true,
            progressBar: true,
          }
        );
      },
      (error) => {
        this.toastr.error(
          "No ha Ingresado un codigo válido",
          "Verifica tu código ",
          {
            timeOut: environment.timeOutmessage,
            closeButton: true,
            progressBar: true,
          }
        );
      }
    );
  }

  submitPass() {
    const decodedData = atob(localStorage.getItem("email") ?? "");
    const decodedData2 = atob(localStorage.getItem("code") ?? "");
    this._loginService
      .updatePass(
        decodedData,
        decodedData2,
        this.passForm?.get("password")?.value
      )
      .subscribe((response: any) => {
        localStorage.removeItem("email");
        localStorage.removeItem("code");
        this.router.navigate(["/sessions/signin"]);
        this.toastr.success(
          "Contraseña actualizada",
          "Puedes iniciar sesión con la contraseña actualizada ",
          {
            timeOut: environment.timeOutmessage,
            closeButton: true,
            progressBar: true,
          }
        );
      });
  }
}
