import { Component, OnInit } from '@angular/core';
import { EventsService} from '../../service/events.list.service';
import { HomefiltercatcherService } from '../../service/homefiltercatcher.service';
import { ServicefilterService } from './../../service/servicefilter.service';
import { UserLoginService } from "../../service/user-login.service";
import { Router } from "@angular/router";
import {
  CognitoCallback,
  CognitoUtil,
  LoggedInCallback
} from "../../service/cognito.service";

@Component({
  selector: "app-list-container",
  templateUrl: "./list-container.component.html",
  styleUrls: ["./list-container.component.css"]
})
export class ListContainerComponent implements OnInit {
  records = {};
  curDate = new Date();
  curMonth = this.curDate.getMonth() + 1;
  changed = false;
  dates = [
    "January",
    "Febuary",
    "March",
    "April",    
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
 
  month = (this.curMonth);
  nowDate =
    ("0" + this.curDate.getDate()).slice(-2) +
    " " +
    this.dates[this.month-1] +
    ", " +
    this.curDate.getFullYear();

  constructor(public events: EventsService,
    public homefilters:HomefiltercatcherService,
    public filterService:ServicefilterService,
    public userService: UserLoginService,
    public cognitoutil: CognitoUtil,
    public router: Router
    ) {}

  homedetails = {}
  bAuthenticated = false;
  ngOnInit() {
    this.homedetails = this.homefilters.returningfilters();
    console.log(this.homedetails);
    this.events.getfilteredevents(this.homedetails).subscribe(data => {
      if(data){

        this.records = data;
      } else {
        console.log("no data")
      }
    });

    this.isLoggedIn();
  }

  isLoggedIn() {
    let cognitoUser = this.cognitoutil.getCurrentUser();
    if (cognitoUser == null) {
      this.bAuthenticated = false;
    } else {
      this.bAuthenticated = true;
    }
    return this.bAuthenticated;
  }
  

  



}
