import { Component, OnInit } from '@angular/core';
import { EventsService} from '../../service/events.list.service';
import { ServicefilterService } from './../../service/servicefilter.service';
import { UserLoginService } from '../../service/user-login.service';
import { ModalService } from './../../service/modal.service';
import { Router } from '@angular/router';
import { FacebookService, UIParams, UIResponse, InitParams } from 'ngx-facebook';
import {
  CognitoCallback,
  CognitoUtil,
  LoggedInCallback
} from '../../service/cognito.service';
import { filters } from './../../interfaces/filters';
import { ModelEvent } from './../../interfaces/singleevent';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.css']
})
export class ListContainerComponent implements OnInit {
   //This is to get the time and date from a certain timestamp
   dateandtime:Array<string>;
   //this is to get just the date
   date:Array<string>;
   //this is to get the month and date sperately
   months:string;
   day:string;
  //This is to hold the pagination no.
  public pagenav:number = 1;
  //This is to get the event id from the list
  private modaleventId:string;
  //filters from the filter component
  private filters:filters;
  records = {};
  curDate = new Date();
  curMonth = this.curDate.getMonth() + 1;
  changed = false;
  modalobject:ModelEvent;
  modalId = '';
  dates = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  month = (this.curMonth);
  nowDate =
    ('0' + this.curDate.getDate()).slice(-2) +
    ' ' +
    this.dates[this.month - 1] +
    ', ' +
    this.curDate.getFullYear();

  constructor(public events: EventsService,
    public filterService: ServicefilterService,
    public userService: UserLoginService,
    public cognitoutil: CognitoUtil,
    private facebookService: FacebookService,
    public router: Router,
    private modalService: ModalService
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

  homedetails = {};
  bAuthenticated = false;
  ngOnInit() {
    console.log(Date.now())
    this.filterService.cast.subscribe((filters) => {
      this.filters = filters;
      this.pagenav = 1;
      //this all will be called when there is a change in the filters
      this.events.getfilterevents(this.filters,this.pagenav).subscribe(data => {
        if (data) {
  
          this.records = data.events;
          console.log(this.records);
        } else {
          console.log('no data');
        }
      });
      
    });

    this.isLoggedIn();
  }

  isLoggedIn() {
    const cognitoUser = this.cognitoutil.getCurrentUser();
    if (cognitoUser == null) {
      this.bAuthenticated = false;
    } else {
      this.bAuthenticated = true;
    }
    return this.bAuthenticated;
  }



  share(url: string, title: string, imgUrl: string, venueName: string, price, date) {
    url = url.split(' ').join('%20');

    /* let params: UIParams = {
     // href: 'https://github.com/zyra/ngx-facebook',
      href:url,
      method: 'share'
    }; */


    const params: UIParams = {
      // href: 'https://github.com/zyra/ngx-facebook',
      // href:url,
      method: 'share_open_graph',
      action_type: 'og.shares',
      action_properties: JSON.stringify({
        object: {
          'og:url': url,
          'og:title': title,
          'og:description': 'Price: ₹ ' + price + ' Date: ' + date + ' Venue: ' + venueName,
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

//opens model window
  openModal(id: string) {
    this.events.getoneevent(`${this.modaleventId}`).subscribe(data => {
      if (data) {

        this.modalobject = data;
        console.log(this.modalobject);
      } else {
        console.log('no data');
      }
    });
    this.modalService.open(id);
}

//closes model window
closeModal(id: string) {
    this.modalService.close(id);
}

// next page pagination
nextpagecall() {
  ++this.pagenav;
  this.events.getfilterevents(this.filters,this.pagenav).subscribe(data => {
    if (data) {

      this.records = data.events;
      console.log(this.records);
    } else {
      console.log('no data');
    }
  });
}

//getting model event id
gettingevent(eventId:string){
  console.log(eventId);
  this.modaleventId = eventId;
}

//previouspagepagination
prevpagecall() {
  if(this.pagenav!=1){
    --this.pagenav;
  } else {
    this.pagenav=1;
  }
  
  this.events.getfilterevents(this.filters,this.pagenav).subscribe(data => {
    if (data) {

      this.records = data.events;
      console.log(this.records);
    } else {
      console.log('no data');
    }
  });

}

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
