import { Component, OnInit } from '@angular/core';
import { EventsService} from '../../service/events.list.service';
import {ServicefilterService} from '../../service/servicefilter.service';
import { integer } from 'aws-sdk/clients/storagegateway';
@Component({
  selector: 'app-filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.css']
})
export class FilterContainerComponent implements OnInit {
  records = {};
  allevents ={};
  inputRange = 2;
  inputSpeedRange=[5,15];
  hr =12;
  min =0;
  // To display start time
  startTime:string;

  // To Display End Time
  endTime:string;
  featureArr: any = { "provider": [],
                    "categories":[],
                    "ages":[],
                    "timerange":"",
                    "location":"",
                    // bookingType is now joined to dates 
                    "bookingType":"",
                    "eventName":"" };
  location ="";
  eventName ="";
  eventNameCheck = "";
  eventDateCheck = "";

  //this is a list of static providers
  staticproviderslist = [];
  constructor(public events: EventsService,
              public filter: ServicefilterService) { }

  ngOnInit() {
    this.eventNameCheck = this.events.returningHomeName();
    if(this.eventNameCheck!=undefined) {
      this.featureArr.eventName = this.eventNameCheck;
    }
    this.eventDateCheck = this.events.returningHomeDate();
    if(this.eventDateCheck!=undefined) {
      this.featureArr.bookingType = this.eventDateCheck;
    }

    this.filter.sendfilters(this.featureArr);

    this.events.getProviders().subscribe(data => {

      if (data) {
        this.staticproviderslist = data.providers;
      }
    });

    this.events.getcategories().subscribe(data => {
      if(data){
        console.log(data);
        this.records = data.categories;
      } else {
        console.log("no categories available");
      }

    });
    
  }



  onChangeProvider(event, cat: any){ // Use appropriate model type instead of any
    this.featureArr.provider.push(cat.event_organizer.name);
  }

  onChangeCategorie(event, cat: any){ // Use appropriate model type instead of any
    if(this.featureArr.categories.find( (element) => {
      return element === cat
    })===undefined){
      this.featureArr.categories.push(cat);
    } else {
      let index = this.featureArr.categories.findIndex( (element) => {
        return element === cat
      })
      this.featureArr.categories.splice(index, 1);
    }

    console.log(this.featureArr.categories)
    
  }

  onChangeAges(event, cat: any){ // Use appropriate model type instead of any
    if(this.featureArr.ages.find( (element) => {
      return element === cat
    })===undefined){
      this.featureArr.ages.push(cat);
    } else {
      let index = this.featureArr.ages.findIndex( (element) => {
        return element === cat
      })
      this.featureArr.ages.splice(index, 1);
    }
    
  }

  onChangetimes(event, cat: any){ // Use appropriate model type instead of any
    this.featureArr.timeinputs.push(cat);
  }

  onApplyChanges(){

    this.featureArr.timerange = this.inputSpeedRange;
    this.featureArr.location = this.location;
    this.featureArr.eventName = this.eventName;
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
    this.featureArr.eventName="";
    this.filter.sendfilters(this.featureArr);
  }

  onBookingType(data){
    this.featureArr.bookingType = data;
  }


  // startTimeCalculator(){
  //   let hour;
  // hour = 12 + (this.inputSpeedRange[0]*20)%60
  // let min = (this.inputSpeedRange[0]*20)%60
  // min = (this.inputSpeedRange[0]-(3*(this.inputSpeedRange[0]%3)))*20
  // this.startTime = hour + "  hr" + min + " min";
  // console.log(this.startTime); 
  // }

}
