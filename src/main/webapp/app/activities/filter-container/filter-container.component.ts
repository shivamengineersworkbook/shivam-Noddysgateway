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
  featureArr: any = { "provider": [],
                    "categories":[],
                    "ages":[],
                    "timerange":String,
                    "location":String,
                    "bookingType":String };
  location:string="";

  //this is a list of static providers
  staticproviderslist = ['hello','main','second','senile'];
  constructor(public events: EventsService,
              public filter: ServicefilterService) { }

  ngOnInit() {
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
    this.filter.sendfilters(this.featureArr);
  }

  onBookingType(data){
    this.featureArr.bookingType = data;
  }

}
