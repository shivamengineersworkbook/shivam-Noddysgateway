import { Component, OnInit } from '@angular/core';
import {
  CognitoCallback,
  CognitoUtil,
  LoggedInCallback
} from '../../service/cognito.service';
import { Router } from '@angular/router';
import { UserLoginService } from '../../service/user-login.service';
import { EventsService} from '../../service/events.list.service';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { HttpResponse } from '@angular/common/http';
import { Event } from './../../interfaces/postuserevent';
import { getViewData } from '@angular/core/src/render3/instructions';
import { validateConfig } from '@angular/router/src/config';
import {category} from './../../interfaces/eventcategories';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent implements OnInit {
  errorMessage: string = null;
  selectedFile: File = null;
  selectedImageUrl = '../../assets/images/addimage.png';
  //  To store the categories got from the service
  categories = [];
  // sending event is the on being sent for the request to the service
  sendingevent = {};


  constructor(public router: Router,
    public userService: UserLoginService,
    public cognitoutil: CognitoUtil,
    public userEvent: EventsService) {
     }

  event = {
    event_type: 'posted',
    event_name: '',
    event_description: '',
    event_category: '',
    event_subcategory: '',
    event_Min_age: '',
    event_Max_age: '',
    event_start_date: '',
    event_last_date: '',
    event_start_time: '',
    event_end_time: '',
    event_city: '',
    event_place: '',
    event_street: '',
    event_address: '',
    event_pincode: '',
    event_organiser_name: '',
    event_organizer_website: '',
    event_phone: '',
    event_email: '',
    event_booking_url: '',
    event_enquiry_url: '',
    event_price: ''    
};

  ngOnInit() {
    this.errorMessage = null;
    // This is to get categories from the server
    this.userEvent.getcategories().subscribe((data) => {
      if(data){
        this.categories = data.categories;
        console.log(this.categories);
      } else {
        this.errorMessage = 'server is down, categories not recieved';
      }

    });

  }

  OnFileSelected(event) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
  }

  OnSubmitPhoto() {
    this.cognitoUser = this.isLoggedIn();
    this.userEvent.postEventImage(this.selectedFile, this.cognitoUser).subscribe((data) => {
      if(data){
        console.log(data);
        this.selectedImageUrl = data;
      } else {
        console.log("image not uploaded");
      }
    });
  }

  cognitoUser = {}
  isLoggedIn() {
    let cognitoUser = this.cognitoutil.getCurrentUser();
    if (cognitoUser == null) {
      this.errorMessage = 'You need to sign in first';
      this.router.navigateByUrl('/home/login');
    } else {
      this.cognitoUser = cognitoUser;
       return cognitoUser;
    }
  }

  validateData(){
    if (this.event.event_name == ''){
      this.errorMessage = 'enter event name'
    } else if (this.event.event_description == ''){
      this.errorMessage = 'enter event description'
    }else if (this.event.event_category == ''){
      this.errorMessage = 'enter event category'
    }else if (this.event.event_Min_age == ''){
      this.errorMessage = 'enter event min age'
    }else if (this.event.event_Max_age == ''){
      this.errorMessage = 'enter event max age'
    }else if (this.event.event_start_date == ''){
      this.errorMessage = 'enter event start date'
    }else if (this.event.event_end_time == ''){
      this.errorMessage = 'enter event end time'
    }else if (this.event.event_last_date == ''){
      this.errorMessage = 'enter event end date'
    }else if (this.event.event_city == ''){
      this.errorMessage = 'enter event city'
    }else if (this.event.event_email == ''){
      this.errorMessage = 'enter event email'
    }else if (this.event.event_booking_url == ''){
      this.errorMessage = 'enter event booking url'
    }else if ( this.event.event_address == ''){
      this.errorMessage = 'enter event address'
    }else {
      this.errorMessage = null;
    }
  }

  res = {};
  OnSubmit() {
    this.cognitoUser = this.isLoggedIn();
    this.validateData();
    if (this.errorMessage!=null){
      console.log("no request made");
    } else {
      
      this.sendingevent = {
        event_type: this.event.event_type,
        event_name: this.event.event_name,
        event_description: this.event.event_description,
        event_category: this.event.event_category,
        // event_subcategory: this.event.event_subcategory,
        event_min_age: this.event.event_Min_age,
        event_max_age: this.event.event_Max_age,
        event_start_date: this.event.event_start_date + "T" + this.event.event_start_time + ":00",
        event_end_date: this.event.event_last_date + "T" + this.event.event_end_time + ":00",
        event_start_time: this.event.event_start_time,
        event_end_time: this.event.event_end_time,
        event_location:{
          longitude:"",
          latitude:"",
          address:{
            id:"",
	          city:this.event.event_city,
	          street:this.event.event_street,
	          pin:this.event.event_pincode
          }
        },
        event_booking:{
          url:this.event.event_booking_url,
          inquiry_url:this.event.event_organizer_website 
        },
        organizer_email:this.event.event_email,
        event_price: this.event.event_price,
        original_event:{},
        event_image_url:this.selectedImageUrl
    };


    console.log(this.sendingevent);
      this.userEvent.addUserEvents(this.cognitoUser, this.sendingevent).subscribe((data) => {
        if (data) {
          this.res = data;
          console.log(this.res);
          this.router.navigate(['/manageevents/dashboard'])

        }  else {
          this.errorMessage = 'Server is Down Come Back Later';
        }
        });
    }
  
  }

}
