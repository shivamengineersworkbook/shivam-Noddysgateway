import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from './../interfaces/postuserevent';
import { userInfo } from 'os';
import { Record } from './../interfaces/getuserevents';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getfilteredevents(homedetails,) {
    return this.http.get("http://localhost:8000/events");
  }

  getcategories(){
    return this.http.get("http://localhost:8000/categories");
  }

  addUserEvents(userId,body){

    return this.http.post<Event>(`http://localhost:8000/user/${userId.username}/events`, body)
  }
  getuserevents(userId){
    return this.http.get< Record>(`http://localhost:8000/user/${userId.username}/events`)
  }

  deleteuserevents(userId,eventId) {
    return this.http.delete(`http://localhost:8000/user/${userId.username}/events/${eventId}`)
  }

  updateuserevents(userId,eventId,body) {
    return this.http.put(`http://localhost:8000/user/${userId.username}/events/${eventId}`,body)
  }

  user:string
  event:string
  savingDetails(userId,eventId) {
      this.user = userId.username;
      this.event = eventId;
  }

  returningDetails(){
     return this.event;
  }
  
}
