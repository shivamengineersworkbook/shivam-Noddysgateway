import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatSelectModule, MatInputModule, MatButtonModule, MatGridListModule, MatExpansionModule, MatCheckboxModule, MatCardModule } from '@angular/material';
import { NouisliderModule } from 'ng2-nouislider';
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ActivitiesComponent } from './activities/activities.component';
import { FilterContainerComponent } from './activities/filter-container/filter-container.component';
import { ListContainerComponent } from './activities/list-container/list-container.component';
import { AuthorizationService } from "./shared/authorization.service";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
    declarations: [AppComponent, HomeComponent, NavbarComponent, ActivitiesComponent, FilterContainerComponent, ListContainerComponent, LoginComponent, RegisterComponent],
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
    providers: [AuthorizationService],
    bootstrap: [AppComponent]
})
export class AppModule {}
