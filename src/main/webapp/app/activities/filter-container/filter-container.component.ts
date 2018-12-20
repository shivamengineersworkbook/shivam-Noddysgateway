import { Component, OnInit } from '@angular/core';
import { EventsService} from '../../service/events.list.service';

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
                    "timeinputs":[],
                    "" }
  
  constructor(public events: EventsService) { }

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
    console.log(this.featureArr)
  }

  onChangeCategorie(event, cat: any){ // Use appropriate model type instead of any
    this.featureArr.categories.push(cat);
    console.log(this.featureArr)
  }

  onChangeAges(event, cat: any){ // Use appropriate model type instead of any
    this.featureArr.ages.push(cat);
    console.log(this.featureArr)
  }

  onChangetimes(event, cat: any){ // Use appropriate model type instead of any
    this.featureArr.timeinputs.push(cat);
    console.log(this.featureArr)
  }

  onApplyChanges(){

  }



}
