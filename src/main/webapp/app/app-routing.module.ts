import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import { ActivitiesComponent } from './activities/activities.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordStep1Component, ForgotPassword2Component} from "./forgot/forgot.component";
import { LogoutComponent, RegistrationConfirmationComponent } from "./confirm/confirm.component";
import { ResendCodeComponent} from "./resend/resend.component";
import { SecureHomeComponent } from "./secure/landing/securehome.component";
import { MyProfileComponent } from "./secure/profile/myprofile.component";
import { JwtComponent } from "./secure/jwttokens/jwt.component";
import { UseractivityComponent } from "./secure/useractivity/useractivity.component";

const appRoutes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "activities",
    component: ActivitiesComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "forgotPassword/:email",
    component: ForgotPassword2Component
  },
  {
    path: "forgotPassword",
    component: ForgotPasswordStep1Component
  },
  {
    path: "confirmRegistration/:username",
    component: RegistrationConfirmationComponent
  },
  {
    path: "resendCode",
    component: ResendCodeComponent
  },
  {
    path: "securehome",
    component: SecureHomeComponent
  },  
  { path: "logout", component: LogoutComponent },
  { path: "jwttokens", component: JwtComponent },
  { path: "myprofile", component: MyProfileComponent },
  { path: "useractivity", component: UseractivityComponent },
  { path: "", component: MyProfileComponent }
];




@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
