import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserLoginService } from "../../service/user-login.service";
import { EventsService} from '../../service/events.list.service';
import { CognitoUser } from 'amazon-cognito-identity-js';
import {
  CognitoCallback,
  CognitoUtil,
  LoggedInCallback
} from "../../service/cognito.service";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  errorMessage:string;
  res= {};
  update:boolean;

  constructor(public router: Router,
    public userService: UserLoginService,
    public cognitoutil: CognitoUtil,
    public userEvent: EventsService) { }

  records ={};
  ngOnInit() {
    this.update = false;
    this.errorMessage = null;
    this.cognitoUser = this.isLoggedIn();
    this.userEvent.getuserevents(this.cognitoUser).subscribe(data => {
    if(data){  

      this.records = data.events;
    } else {
      console.log("no data")
    }
  });
  console.log(this.records);
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

  reply = {};
  deleteevent(eventid) {
    this.userEvent.deleteuserevents(this.cognitoUser,eventid).subscribe((data) => {
      console.log(this.cognitoUser);
      
      if(data){
        this.res = data;  
      }else if(!data) {
        this.errorMessage = "event cannot be deleted";
      }
    });
  }

  Updateevent(eventid) {
    // this.userEvent.updateuserevents(this.cognitoUser,eventid,body).subscribe((data) => {
      
    // })
    this.update = true;
    this.userEvent.savingDetails(this.cognitoUser,eventid);

  }
}
