import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getfilteredevents() {
    return this.http.get("http://localhost:8000/events");
  }

  getcategories(){
    return this.http.get("http://localhost:8000/categories");
  }

  addUserEvents(userId,body){

    return this.http.post(`http://localhost:8000/user/${userId.username}/events`, body);
  }
  

}
