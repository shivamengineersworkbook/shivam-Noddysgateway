import {
    Component,
    ViewChild,
    ElementRef,
    Renderer2,
    AfterViewInit
} from '@angular/core';
import { EventsService } from '../service/events.list.service';
import { Router } from '@angular/router';
import { ModalService } from './../service/modal.service';
import { ModelEvent } from './../interfaces/singleevent';
import {
  CognitoCallback,
  CognitoUtil,
  LoggedInCallback
} from './../service/cognito.service';
import { UserLoginService } from './../service/user-login.service';
import { delay, share } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { category } from './../interfaces/eventcategories';


declare var $: any;
declare var require: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  // This is to get the time and date from a certain timestamp
  dateandtime: Array<string>;
  // this is to get just the date
  date: Array<string>;
  // this is to get the month and date sperately
  month: string;
  day: string;
  // This is to get the event id from the list
  private modaleventId: string;
  modalobject: ModelEvent;
  bAuthenticated = false;


  rotatingTexts = [
    'adventure',
    'astronaut camp',
    'chess match',
    'cook-off',
    'dance recital',
    'puppet show',
    'storytime',
    'swim lesson',
    'swordfight'
  ];

  @ViewChild('rotatingText') rotatingText: ElementRef;
  events = [];
  eventName = "";


  dates = [
    {
      value: 'All Dates',
      viewValue: 'All Dates'
    },
    {
      value: 'Today',
      viewValue: 'Today'
    },
    {
      value: 'Tomorrow',
      viewValue: 'Tomorrow'
    },
    {
      value: 'This Week',
      viewValue: 'This Week'
    },
    {
      value: 'This Weekend',
      viewValue: 'This Weekend'
    },
    {
      value: 'Next Week',
      viewValue: 'Next Week'
    },
    {
      value: 'Next Month',
      viewValue: 'Next Month'
    }
  ];
  eventDate = this.dates[0].viewValue;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    public eventcategories: EventsService,
    private modalService: ModalService,
    public userService: UserLoginService,
    public cognitoutil: CognitoUtil
  ) {}

records = []

  ngOnInit() {
    this.eventcategories.getcategories().subscribe(data => {
		if (data){
			this.loaded = true;
			this.records = data.categories;
			console.log(this.records);
      	} else {
        	console.log('no data');
      	}

    });

    this.eventcategories.getfilteredevents('').subscribe(data => {
      if (data){
        this.events = data.events;
        console.log(this.events);
      } else {
        console.log('no data');
      }
    });

    $('.your-class').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplaySpeed: 1500,
      prevArrow: $('.backbut'),
      nextArrow: $('.forbut'),
      responsive: [
        {
          breakpoint: 1920,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 1080,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });

    $('.categoriescara').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '60px',
      prevArrow: $('.catbackbut'),
      nextArrow: $('.catforbut'),
      responsive: [
        {
          breakpoint: 1080,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1
          }
        },
      ]
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

  ngAfterViewInit() {
    let i = 0;
    setInterval(() => {
      this.renderer.setProperty(
        this.rotatingText.nativeElement,
        'innerHTML',
        this.rotatingTexts[i]
      );
      i++;
      if (i === 8) { i = 0; }
    }, 500);
  }




 //This function returns the month from the time stamp
 getmonth(timestamp) {
    this.dateandtime = timestamp.split('T');
    this.date = this.dateandtime[0].split('-');
    this.day = this.date[2];
    this.month = this.date[1];
    if (this.month === '01'){
      this.month = 'Jan'
    } else if (this.month === '02'){
      this.month = 'Feb'
    } else if (this.month === '03'){
      this.month = 'Mar'
    } else if (this.month === '04'){
      this.month = 'Apr'
    } else if (this.month === '05'){
      this.month = 'May'
    } else if (this.month === '06'){
      this.month = 'Jun'
    } else if (this.month === '07'){
      this.month = 'Jul'
    } else if (this.month === '08'){
      this.month = 'Aug'
    } else if (this.month === '09'){
      this.month = 'Sept'
    } else if (this.month === '10'){
      this.month = 'Oct'
    } else if (this.month === '11'){
      this.month = 'Nov'
    } else{
      this.month = 'Dec'
    }

    return `${this.day}, ${this.month}`;
 }


 //opens model window
 openModal(id: string) {
  this.eventcategories.getoneevent(`${this.modaleventId}`).subscribe(data => {
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

//getting model event id
gettingevent(eventId: string){
  console.log(eventId);
  this.modaleventId = eventId;
}


// This is to send the home filters to the events service
savefilters(eventDate) {
 this.eventcategories.gettingHomeFilters(this.eventName, eventDate); 
}
}
