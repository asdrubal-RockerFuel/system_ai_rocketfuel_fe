import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ForgotComponent } from './forgot/forgot.component';
import { MasterCSVFileComponent } from './master-csvfile/master-csvfile.component';

const routes: Routes = [
  // {
  //   path: 'signup',
  //   component: SignupComponent
  // },
  // {
  //   path: 'signin',
  //   component: SigninComponent
  // },
  // {
  //   path: 'forgot',
  //   component: ForgotComponent
  // },
  {
    path: 'csv-file',
    component: MasterCSVFileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionsRoutingModule { }
