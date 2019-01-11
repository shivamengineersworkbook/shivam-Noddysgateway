import { Component, OnInit } from '@angular/core';
import { EventsService} from '../../service/events.list.service';
import { HomefiltercatcherService } from '../../service/homefiltercatcher.service';
import { ServicefilterService } from './../../service/servicefilter.service';
import { UserLoginService } from "../../service/user-login.service";
import { Router } from "@angular/router";
import { FacebookService, UIParams, UIResponse, InitParams } from 'ngx-facebook';
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
    private facebookService: FacebookService,
    public router: Router
    ) {

      // let initParams: InitParams = {
      //   appId: '1950221055301408',
      //   xfbml: true,
      //   version: 'v2.10'
      // };
  
      // facebookService.init(initParams);

      facebookService.init({
        appId: '1950221055301408',
        xfbml: true,
        version: 'v2.9'
      });
    }

  homedetails = {}
  bAuthenticated = false;
  ngOnInit() {
    this.homedetails = this.homefilters.returningfilters();
    console.log(this.homedetails);
    this.events.getfilteredevents(this.homedetails).subscribe(data => {
      if(data){

        this.records = data.events;
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
  

  
  share(url: string, title: string, imgUrl: string, venueName: string, price, date) {
    url = url.split(" ").join("%20");

    /* let params: UIParams = {
     // href: 'https://github.com/zyra/ngx-facebook',
      href:url,
      method: 'share'
    }; */


    let params: UIParams = {
      // href: 'https://github.com/zyra/ngx-facebook',
      // href:url,
      method: 'share_open_graph',
      action_type: 'og.shares',
      action_properties: JSON.stringify({
        object: {
          'og:url': url,
          'og:title': title,
          'og:description': "Price: ₹ " + price + " Date: " + date + " Venue: " + venueName,
          // 'og:image': url + '/assets/images/logo.png',
          'og:image': imgUrl,
          'og:image:width': '1200',
          'og:image:height': '630',
          // 'og:image:type': 'image/jpeg'
        }
      })
    };

    /* let params: UIParams = {
     // href: 'https://github.com/zyra/ngx-facebook',
     // href:url,
     //  method: 'share_open_graph',
     method: 'share',
           href: url,
           'description': "Price: ₹ " + price + " Date: " + date + " Venue: " + venueName,
           // 'og:image': url + '/assets/images/logo.png',
           'picture': imgUrl,
           // 'og:image:width': '1200',
           // 'og:image:height': '630',
           // 'og:image:type': 'image/jpeg'
    }; */

    this.facebookService.ui(params)
      .then((res: UIResponse) => console.log(res))
      .catch((e: any) => console.error(e));

  }

  // share() {

  //   const options: UIParams = {
  //     method: 'share',
  //     href: 'https://github.com/zyramedia/ng2-facebook-sdk'
  //   };

  //   this.facebookService.ui(options)
  //     .then((res: UIResponse) => {
  //       console.log('Got the users profile', res);
  //     })
  //     .catch((error)=> {
  //       console.log(error)
  //     });

  // }


}
