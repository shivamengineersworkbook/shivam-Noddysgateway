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
import { ModalService } from './../../service/modal.service';
// import { ModelEvent } from './../../interfaces/singleevent';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // to hold the events recieved from the survice
  records = {};
  // to seprate the two events
  subscribed = [];
  posted = [];
 //This is to get the time and date from a certain timestamp
 dateandtime:Array<string>;
 //this is to get just the date
 date:Array<string>;
 //this is to get the month and date sperately
 months:string;
 day:string;  
  //This is to get the event id from the list
  // private modaleventId:string;
  // modalobject:ModelEvent;

  constructor(public router: Router,
    public userService: UserLoginService,
    public cognitoutil: CognitoUtil,
    public userEvent: EventsService,
    public dialog: MatDialog,
    private modalService: ModalService) { }

  ngOnInit() {
    this.cognitoUser = this.isLoggedIn();
    this.userEvent.getuserevents(this.cognitoUser).subscribe((data) => {
      if(data){
        this.subscribed = data.events.subscribed;
        this.posted = data.events.posted;
        console.log(this.subscribed)
      } else {
        console.log("server is down");
      }

    })
  }

 
  // Object Getting the user...
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

//   //opens model window
//   openModal(id: string) {
//     this.userEvent.getoneevent(`${this.modaleventId}`).subscribe(data => {
//       if (data) {
//         this.modalobject = data;
//         console.log(this.modalobject);
//       } else {
//         console.log('no data');
//       }
//     });
//     this.modalService.open(id);
// }

// //closes model window
// closeModal(id: string) {
//     this.modalService.close(id);
// }



// //getting model event id
// gettingevent(eventId:string){
//   console.log(eventId);
//   this.modaleventId = eventId;
// }

 //This function returns the month fro the time stamp
 getmonth(timestamp) {
  this.dateandtime = timestamp.split("T");
  this.date = this.dateandtime[0].split("-");
  this.day = this.date[2];
  this.months = this.date[1];
  if(this.months == "01"){
    this.months = "Jan"
  } else if(this.months == "02"){
    this.months = "Feb"
  } else if(this.months == "03"){
    this.months = "Mar"
  } else if(this.months == "04"){
    this.months = "Apr"
  } else if(this.months == "05"){
    this.months = "May"
  } else if(this.months == "06"){
    this.months = "Jun"
  } else if(this.months == "07"){
    this.months = "Jul"
  } else if(this.months == "08"){
    this.months = "Aug"
  } else if(this.months == "09"){
    this.months = "Sept"
  } else if(this.months == "10"){
    this.months = "Oct"
  } else if(this.months == "11"){
    this.months = "Nov"
  } else{
    this.months = "Dec"
  }

  return `${this.day}, ${this.months}`;
}

}
