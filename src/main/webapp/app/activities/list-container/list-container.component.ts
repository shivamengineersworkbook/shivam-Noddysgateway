import { Component, OnInit } from '@angular/core';
import { EventsService} from '../../service/events.list.service';
import { HomefiltercatcherService } from '../../service/homefiltercatcher.service';

@Component({
  selector: "app-list-container",
  templateUrl: "./list-container.component.html",
  styleUrls: ["./list-container.component.css"]
})
export class ListContainerComponent implements OnInit {
  records = {};
  curDate = new Date();
  curMonth = this.curDate.getMonth() + 1;
  dates = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
 
  month = (this.curMonth);
  nowDate =
    ("0" + this.curDate.getDate()).slice(-2) +
    " " +
    this.dates[this.month-1] +
    ", " +
    this.curDate.getFullYear();

  constructor(public events: EventsService,
    public homefilters:HomefiltercatcherService) {}

  homedetails = {}
  ngOnInit() {
    this.homedetails = this.homefilters.returningfilters();
    console.log(this.homedetails);
    this.events.getfilteredevents(this.homedetails).subscribe(data => {
      if(data){

        this.records = data;
      } else {
        console.log("no data")
      }
    });
    console.log(this.records);
  }

}
