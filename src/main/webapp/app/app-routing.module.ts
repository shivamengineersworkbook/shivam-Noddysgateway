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
  HomeOverComponent
} from "./auth/auth.component";
import { ManageeventsComponent } from "./manageevents/manageevents.component";
import { AddeventComponent } from './manageevents/addevent/addevent.component';
import { DashboardComponent } from './manageevents/dashboard/dashboard.component';
import {UpdateComponent} from './manageevents/update/update.component';
import {UpdatefinalComponent} from './manageevents/update/updatefinal/updatefinal.component'

const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "activities",
    component: ActivitiesComponent
  },
  {
    path: "securehome",
    component: SecureHomeComponent
  },
  { path: "logout", component: LogoutComponent },
  { path: "jwttokens", component: JwtComponent },
  { path: "myprofile", component: MyProfileComponent },
  { path: "useractivity", component: UseractivityComponent },
  { path: "manageevents", component:ManageeventsComponent,
    children: [

      { path: "addevent", component:AddeventComponent },
      {
        path: "dashboard", component:DashboardComponent
      },
      {
        path: "update", component:UpdateComponent,
        children:[
          {
            path:"updateid", component:UpdatefinalComponent
          }
        ]
      }
    ]},

  {
    path: "home",
    component: HomeOverComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      {
        path: "confirmRegistration/:username",
        component: RegistrationConfirmationComponent
      },
      { path: "resendCode", component: ResendCodeComponent },
      { path: "forgotPassword/:email", component: ForgotPassword2Component },
      { path: "forgotPassword", component: ForgotPasswordStep1Component }
    ]
  }
];




@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
exports: [RouterModule]
})
export class AppRoutingModule {}
