import { Component, OnInit } from '@angular/core';
import { EventsService} from '../../service/events.list.service';
import {ServicefilterService} from '../../service/servicefilter.service';

@Component({
  selector: 'app-filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.css']
})
export class FilterContainerComponent implements OnInit {
  records = {};
  allevents ={};
  inputSpeedRange=[5,15];
  featureArr: any = { "provider": [],
                    "categories":[],
                    "ages":[],
                    "timerange":String,
                    "location":String,
                    "bookingType":String };
  location:string="";
  
  constructor(public events: EventsService,
              public filter: ServicefilterService) { }

  ngOnInit() {
    this.events.getcategories().subscribe(data => {
      if(data){
        console.log(this.records);
        this.records = data;
      } else {
        console.log("no categories available");
      }

    });

    this.events.getfilteredevents("").subscribe(data => {
      if(data){
        this.allevents = data
      } else {
        console.log("no providers available");
      }
    })
    
  }



  onChangeProvider(event, cat: any){ // Use appropriate model type instead of any
    this.featureArr.provider.push(cat.event_organizer.name);
  }

  onChangeCategorie(event, cat: any){ // Use appropriate model type instead of any
    this.featureArr.categories.push(cat);
  }

  onChangeAges(event, cat: any){ // Use appropriate model type instead of any
    this.featureArr.ages.push(cat);
  }

  onChangetimes(event, cat: any){ // Use appropriate model type instead of any
    this.featureArr.timeinputs.push(cat);
  }

  onApplyChanges(){

    this.featureArr.timerange = this.inputSpeedRange;
    this.featureArr.location = this.location;
    console.log(this.featureArr);
    this.filter.sendfilters(this.featureArr);

  }

  onClearFilters(){
    this.featureArr.timerange = [];
    this.featureArr.provider =[];
    this.featureArr.categories=[];
    this.featureArr.ages=[];
    this.featureArr.timeinputs="";
    this.featureArr.location ="";
    this.featureArr.bookingType="";
    console.log(this.featureArr);
    this.filter.sendfilters(this.featureArr);
  }

  onBookingType(data){
    this.featureArr.bookingType = data;
  }
}
