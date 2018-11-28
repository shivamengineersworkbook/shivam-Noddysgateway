import { Component, OnInit } from '@angular/core';
import {
  CognitoCallback,
  CognitoUtil,
  LoggedInCallback
} from "../../service/cognito.service";
import { Router } from "@angular/router";
import { UserLoginService } from "../../service/user-login.service";
import { EventsService} from '../../service/events.list.service';
import { CognitoUser } from 'amazon-cognito-identity-js';


@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent implements OnInit {

  constructor(public router: Router,
    public userService: UserLoginService,
    public cognitoutil: CognitoUtil,
    public userEvent: EventsService) { }


  event = {
    event_name:"",
    event_description:"",
    event_category:"",
    event_subcategory:"",
    event_Min_age:"",
    event_Max_age:"",
    event_start_date:"",
    event_end_date:"",
    event_start_time:"",
    event_end_time:"",
    event_city:"",
    event_place:"",
    event_street:"",
    event_address:"",
    event_pincode:"",
    event_organiser_name:"",
    event_organizer_website:"",
    event_phone:"",
    event_email:"",
    event_Image_url:"",
    event_booking_url:"",
    event_enquiry_url:"",
    event_price:""    
}  

  ngOnInit() {
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
  OnSubmit() {
    this.cognitoUser = this.isLoggedIn();
  this.userEvent.addUserEvents(this.cognitoUser,this.event).subscribe((data) => {
    if(data) {
      this.reply = data;
      console.log(this.reply)
    }  else {
      this.reply = "Server is Down Come Back Later";
    }
    });
  }

}
