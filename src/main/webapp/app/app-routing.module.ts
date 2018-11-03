import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./auth/login/login.component";
import { ActivitiesComponent } from './activities/activities.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordStep1Component, ForgotPassword2Component} from "./auth/forgot/forgot.component";
import { LogoutComponent, RegistrationConfirmationComponent } from "./auth/confirm/confirm.component";
import { ResendCodeComponent} from "./auth/resend/resend.component";
import { SecureHomeComponent } from "./secure/landing/securehome.component";
import { MyProfileComponent } from "./secure/profile/myprofile.component";
import { JwtComponent } from "./secure/jwttokens/jwt.component";
import { UseractivityComponent } from "./secure/useractivity/useractivity.component";
import {
  AboutComponent,
  HomeOverComponent,
  HomeLandingComponent
} from "./auth/auth.component";

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
  { path: 'homelanding', component: HomeLandingComponent },
  { path: 'about', component: AboutComponent },
  { path: 'homeover', component: HomeOverComponent}
];




@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
