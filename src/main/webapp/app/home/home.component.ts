import {
    Component,
    ViewChild,
    ElementRef,
    Renderer2,
    AfterViewInit
} from '@angular/core';
import { EventsService } from '../service/events.list.service'
import { Router } from '@angular/router';
import { HomefiltercatcherService } from './../service/homefiltercatcher.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements AfterViewInit {
  rotatingTexts = [
    "adventure",
    "astronaut camp",
    "chess match",
    "cook-off",
    "dance recital",
    "puppet show",
    "storytime",
    "swim lesson",
    "swordfight"
  ];

  @ViewChild("rotatingText") rotatingText: ElementRef;
  events = {};
  eventName = "";

  dates = [
    {
      value: "All Dates",
      viewValue: "All Dates"
    },
    {
      value: "Today",
      viewValue: "Today"
    },
    {
      value: "Tomorrow",
      viewValue: "Tomorrow"
    },
    {
      value: "This Week",
      viewValue: "This Week"
    },
    {
      value: "This Weekend",
      viewValue: "This Weekend"
    },
    {
      value: "Next Week",
      viewValue: "Next Week"
    },
    {
      value: "Next Month",
      viewValue: "Next Month"
    }
  ];
  eventDate = this.dates[0].viewValue;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    public eventcategories: EventsService,
    public homefilters:HomefiltercatcherService
  ) {}

records = [];

  ngOnInit() {
    this.eventcategories.getcategories().subscribe(data => {
      if(data){
        this.records = data.categories;
        console.log(this.records);
      } else {
        console.log("no data")
      }
      
    });

    this.eventcategories.getfilteredevents("").subscribe(data => {
      if(data){

        this.events = data.events;
      } else {
        console.log("no data")
      }
    });
  }

  categor = ['Art','Cooking','EventsFree' ,'Activity','Language','Music','Open Play','Private Lessons','Science','Swim']
  ngAfterViewInit() {
    let i = 0;
    setInterval(() => {
      this.renderer.setProperty(
        this.rotatingText.nativeElement,
        "innerHTML",
        this.categor[i]
      );
      i++;
      if (i == 8) i = 0;
    }, 500);
  }

  filters={
    search:"",
    date:"",
    age:"",
    categorie:""
  }
 savefilters(search="", date="", age="",categorie="") {
  if(search == ""){
    console.log("empty serach")
  } else {
    console.log(search);
    this.filters.search = search;
  }

  if(date == ""){
    console.log("empty date")
  } else {
    console.log(date);
    this.filters.date = date;
  }

  if(age == ""){
    console.log("empty age")
  } else {
    console.log(age);
    this.filters.age = age;
  }

  if(categorie == ""){
    console.log("empty categorie")
  } else {
    console.log(categorie);
    this.filters.categorie = categorie;
  }

  this.homefilters.sendingfilters(this.filters);
 }

 
}
