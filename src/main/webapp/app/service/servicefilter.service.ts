import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {filters} from './../interfaces/filters';

@Injectable({
  providedIn: 'root'
})
export class ServicefilterService {
  // This is the service for the filter component in activities to send live filters to list container

   
  constructor() { }

  
  nav={};
  details = {};

  private filters = new BehaviorSubject<filters>({provider: [],
    categories:[],
    ages:[],
    timerange:"",
    location:"",
    bookingType:"",
    eventName:""});
  cast = this.filters.asObservable();

  sendfilters(obj:filters){
    this.filters.next(obj);
  }

  returnfilters(){
    console.log(this.details);
    return this.details;
  }

  sendnavfilters(obj){
    this.nav=obj;
  }

  returnnavfilters(obj){
    console.log(this.nav);
    return this.nav;
  }

}
