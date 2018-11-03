import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationService } from "./service/user-registration.service";
import { UserParametersService } from "./service/user-parameters.service";
import { LogoutComponent, RegistrationConfirmationComponent } from "./auth/confirm/confirm.component";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatSelectModule, MatInputModule, MatButtonModule, MatGridListModule, MatExpansionModule, MatCheckboxModule, MatCardModule } from '@angular/material';
import { NouisliderModule } from 'ng2-nouislider';
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from "./app-routing.module";
import { DynamoDBService } from "./service/ddb.service";
import { AwsUtil } from "./service/aws.service";
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ActivitiesComponent } from './activities/activities.component';
import { FilterContainerComponent } from './activities/filter-container/filter-container.component';
import { ListContainerComponent } from './activities/list-container/list-container.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NewPasswordComponent } from "./auth/newpassword/newpassword.component";
import { UserLoginService } from "./service/user-login.service";
import { CognitoUtil } from "./service/cognito.service";
import { ForgotPasswordStep1Component, ForgotPassword2Component } from "./auth/forgot/forgot.component";
import { MFAComponent } from "./auth/mfa/mfa.component";
import { ResendCodeComponent } from "./auth/resend/resend.component";
import { SecureHomeComponent } from "./secure/landing/securehome.component";
import { MyProfileComponent } from "./secure/profile/myprofile.component";
import { JwtComponent } from "./secure/jwttokens/jwt.component";
import { UseractivityComponent } from "./secure/useractivity/useractivity.component";
import { AboutComponent, HomeOverComponent, HomeLandingComponent } from "./auth/auth.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ActivitiesComponent,
    FilterContainerComponent,
    ListContainerComponent,
    LoginComponent,
    RegisterComponent,
    NewPasswordComponent,
    ForgotPasswordStep1Component,
    LogoutComponent,
    MFAComponent,
    RegistrationConfirmationComponent,
    ResendCodeComponent,
    ForgotPassword2Component,
    UseractivityComponent,
    JwtComponent,
    MyProfileComponent,
    SecureHomeComponent,
    AboutComponent,
    HomeOverComponent,
    HomeLandingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatGridListModule,
    MatExpansionModule,
    MatCardModule,
    NouisliderModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    CognitoUtil,
    AwsUtil,
    DynamoDBService,
    UserRegistrationService,
    UserLoginService,
    UserParametersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
