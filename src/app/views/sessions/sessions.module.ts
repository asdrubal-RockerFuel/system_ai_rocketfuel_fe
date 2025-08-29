import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SessionsRoutingModule } from "./sessions-routing.module";
import { SignupComponent } from "./signup/signup.component";
import { SigninComponent } from "./signin/signin.component";
import { ForgotComponent } from "./forgot/forgot.component";
import { SharedModule } from "../../shared/shared.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SharedComponentsModule } from "src/app/shared/components/shared-components.module";
import { CodeInputModule } from "angular-code-input";
import { MasterCSVFileComponent } from "./master-csvfile/master-csvfile.component";
import { NgxDropzoneModule } from "ngx-dropzone";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    SessionsRoutingModule,
    CodeInputModule,
    NgxDropzoneModule,
  ],
  declarations: [SignupComponent, SigninComponent, ForgotComponent, MasterCSVFileComponent],
})
export class SessionsModule { }
