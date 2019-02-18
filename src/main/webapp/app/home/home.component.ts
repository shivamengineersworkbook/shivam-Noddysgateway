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

declare var $: any;
declare var require: any;


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
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
  events = [];
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

    $('.your-class').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplaySpeed: 1500,
      prevArrow:$('.backbut'),
      nextArrow:$('.forbut'),
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3
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

    $('.hello-categories').slick({
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 5,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
    });
		

    this.eventcategories.getfilteredevents("").subscribe(data => {
      if(data){

        this.events = data.events;
      } else {
        console.log("no data")
      }
    });


  //   $("#myCarousel").on("slide.bs.carousel", function(e) {
  //     var $e = $(e.relatedTarget);
  //     var idx = $e.index();
  //     var itemsPerSlide = 3;
  //     var totalItems = $(".carousel-item").length;

  //     if (idx >= totalItems - (itemsPerSlide - 1)) {
  //       var it = itemsPerSlide - (totalItems - idx);
  //       for (var i = 0; i < it; i++) {
  //         // append slides to end
  //         if (e.direction == "left") {
  //           $(".carousel-item")
  //             .eq(i)
  //             .appendTo(".carousel-inner");
  //         } else {
  //           $(".carousel-item")
  //             .eq(0)
  //             .appendTo($(this).find(".carousel-inner"));
  //         }
  //       }
  //     }
  //   });
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
