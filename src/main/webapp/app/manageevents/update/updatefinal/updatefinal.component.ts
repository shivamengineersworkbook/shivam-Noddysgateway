import { Component, OnInit } from '@angular/core';
import {
  CognitoCallback,
  CognitoUtil,
  LoggedInCallback
} from "../../../service/cognito.service";
import { Router } from "@angular/router";
import { UserLoginService } from "../../../service/user-login.service";
import { EventsService} from '../../../service/events.list.service';
import { Record } from './../../../interfaces/getuserevents';
import { Response } from 'selenium-webdriver/http';

@Component({
  selector: 'app-updatefinal',
  templateUrl: './updatefinal.component.html',
  styleUrls: ['./updatefinal.component.css']
})
export class UpdatefinalComponent implements OnInit {
  errorMessage:string;
  // This is for getting the one single event
  record = {};
  eventId:string;

  constructor(public router: Router,
    public userService: UserLoginService,
    public cognitoutil: CognitoUtil,
    public userEvent: EventsService) {
     }

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
};

mainrecord = {
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
};

ngOnInit() {
  this.errorMessage= null;
  this.eventId = this.userEvent.returningDetails();
  console.log(this.eventId);

  this.userEvent.getoneevent(this.eventId).subscribe(data => {
    if(data){

      this.record = data;
      console.log(this.record);
          console.log(this.mainrecord);
          this.mainrecord = {
            event_name:data.event_name,
            event_description:data.event_description,
            event_category:data.event_category,
            event_subcategory:data.event_subcategory,
            event_Min_age:data.event_min_age,
            event_Max_age:data.event_max_age,
            event_start_date:data.event_start_date,
            event_end_date:data.event_last_date,
            event_start_time:data.event_start_time,
            event_end_time:data.event_end_time,
            event_city:data.event_location.address.city,
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
            event_price:data.event_price    
          };
        }
      });


}

cognitoUser= {}
isLoggedIn() {
  let cognitoUser = this.cognitoutil.getCurrentUser();
  if (cognitoUser == null) {
    this.errorMessage = "You need to sign in first";
    this.router.navigateByUrl("/home/login");
  } else {
    this.cognitoUser = cognitoUser;
     return cognitoUser;
  }
}


validateData(){
  if(this.event.event_name == ""){
    this.errorMessage = "enter event name"
  } else if(this.event.event_description == ""){
    this.errorMessage = "enter event description"
  }else if(this.event.event_category==""){
    this.errorMessage = "enter event category"
  }else if(this.event.event_subcategory==""){
    this.errorMessage = "enter event sub category"
  }else if(this.event.event_Min_age==""){
    this.errorMessage = "enter event min age"
  }else if(this.event.event_Max_age==""){
    this.errorMessage = "enter event max age"
  }else if(this.event.event_start_date==""){
    this.errorMessage = "enter event start date"
  }else if(this.event.event_end_time==""){
    this.errorMessage = "enter event end time"
  }else if(this.event.event_end_date==""){
    this.errorMessage = "enter event end date"
  }else if(this.event.event_city==""){
    this.errorMessage = "enter event city"
  }else if(this.event.event_email==""){
    this.errorMessage = "enter event email"
  }else if(this.event.event_booking_url==""){
    this.errorMessage = "enter event booking url"
  }else if( this.event.event_address==""){
    this.errorMessage = "enter event address"
  }
}

res = {};
OnSubmit() {
  this.cognitoUser = this.isLoggedIn();
  this.validateData()
  if(this.errorMessage){
    console.log("no request made")
  } else {
    this.userEvent.updateuserevents(this.cognitoUser,this.event,this.event).subscribe((data) => {
      console.log(data);
      if(data) {
        this.res = data.event;
        console.log(this.res)
      }  else {
        this.errorMessage = "Server is Down Come Back Later";
      }
      });
  }

}
}
