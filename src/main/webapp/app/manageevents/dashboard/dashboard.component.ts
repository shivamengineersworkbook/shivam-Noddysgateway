import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserLoginService } from "../../service/user-login.service";
import { EventsService} from '../../service/events.list.service';
import { CognitoUser } from 'amazon-cognito-identity-js';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {
  CognitoCallback,
  CognitoUtil,
  LoggedInCallback
} from "../../service/cognito.service";
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public router: Router,
    public userService: UserLoginService,
    public cognitoutil: CognitoUtil,
    public userEvent: EventsService,
    public dialog: MatDialog ) { }

    records ={};
    subscribed =[];
    posted =[];
  ngOnInit() {
    this.cognitoUser = this.isLoggedIn();
    this.userEvent.getuserevents(this.cognitoUser).subscribe(data => {
    if(data){

      this.records = data.events;
      this.subscribed = data.events.subscribed;
      this.posted = data.events.posted;
    } else {
      console.log("no data")
    }
  });
  console.log(this.records);
  }

  OnOpen(id){
    console.log(id);
    this.dialog.open(ModalComponent);
    this.userEvent.singleIdDetails(id);
  }

  cognitoUser= {}
  isLoggedIn() {
    let cognitoUser = this.cognitoutil.getCurrentUser();
    if (cognitoUser == null) {
      this.router.navigateByUrl("/home/login");
    } else {
      this.cognitoUser = cognitoUser;
       return cognitoUser;
    }
  }

}
