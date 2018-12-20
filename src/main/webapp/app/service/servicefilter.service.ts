import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicefilterService {

  constructor() { }

  details={}

  sendfilters(obj){
    this.details = obj;
    console.log(this.details);
  }

  returnfilters(){
    console.log(this.details);
    return this.details;
  }

}
