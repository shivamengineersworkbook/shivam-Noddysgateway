import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import { ActivitiesComponent } from './activities/activities.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordStep1Component } from "./forgot/forgot.component";

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
    path: "forgotpassword",
    component: ForgotPasswordStep1Component
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
