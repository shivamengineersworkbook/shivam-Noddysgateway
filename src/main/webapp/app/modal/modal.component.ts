import { Component, OnInit } from '@angular/core';
import { EventsService} from './../service/events.list.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(public Event: EventsService,) { }

  record = {};
  id: string;

  public visible = false;
  public visibleAnimate = false;
  public keyname;
  public occurrence;
  public display:boolean=false;
  public allEvents={};
  public show(key,allEvents,display,occurrence): void {
    this.keyname=key;
    this.allEvents=allEvents;
    this.display=display;
    this.occurrence=occurrence;
    
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }
  public showReset(): void{
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }
  
  ngOnInit() {
    this.id = this.Event.returnsingleIdDetails();
    this.Event.getoneevent(this.id).subscribe((data) => {
      if(data) {
        this.record = data;
        
      }
      console.log(this.record);
      
    })
  }

}
