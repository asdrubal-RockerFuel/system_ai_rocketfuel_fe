import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignupComponent } from "./signup/signup.component";
import { SigninComponent } from "./signin/signin.component";
import { ForgotComponent } from "./forgot/forgot.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MasterCSVFileComponent } from "./master-csvfile/master-csvfile.component";
// import { NgxDropzoneModule } from "ngx-dropzone";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MasterCSVFileComponent,
  ],
  declarations: [],
})
export class SessionsModule {}
