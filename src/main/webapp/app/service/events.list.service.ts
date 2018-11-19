import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getfilteredevents() {
    return this.http.get("http://8ae02cc9.ngrok.io/events");
  }

  getcategories(){
    return this.http.get("http://8ae02cc9.ngrok.io/categories");
  }

}
