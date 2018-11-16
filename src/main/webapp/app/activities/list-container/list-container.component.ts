import { Component, OnInit } from '@angular/core';
import { EventsService} from '../../service/events.list.service'

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.css']
})
export class ListContainerComponent implements OnInit {
  records = {}

  constructor(public events: EventsService) { }

  ngOnInit() {
     this.events.getfilteredevents().subscribe((data) => {
       this.records = data;
       
     })
    console.log(this.records);     
  }

}
