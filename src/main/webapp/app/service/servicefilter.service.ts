import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicefilterService {

  constructor() { }

  details={}
  nav={}

  sendfilters(obj){
    this.details = obj;
    console.log(this.details);
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
