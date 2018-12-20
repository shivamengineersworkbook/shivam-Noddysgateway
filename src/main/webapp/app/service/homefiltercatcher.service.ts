import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomefiltercatcherService {

  constructor() { }
  
  details={}
  sendingfilters(obj){
    this.details = obj;
    console.log(this.details);
  }

  returningfilters(){
    console.log(this.details);
    return this.details;
  }
}
