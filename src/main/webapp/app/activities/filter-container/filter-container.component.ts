import { Component, OnInit } from '@angular/core';
import { EventsService} from '../../service/events.list.service';

@Component({
  selector: 'app-filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.css']
})
export class FilterContainerComponent implements OnInit {

  records = {}
  inputSpeedRange=[4,9];
  
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
    
  }

}
