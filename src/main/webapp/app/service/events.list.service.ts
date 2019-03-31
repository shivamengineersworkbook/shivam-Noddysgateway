import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from './../interfaces/postuserevent';
import { userInfo } from 'os';
import { Record } from './../interfaces/getuserevents';
import { category } from './../interfaces/eventcategories';
import { MainEvent } from './../interfaces/getallevents';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getfilteredevents(details) {
    console.log(details);
    return this.http.get<MainEvent>("http://ec2-13-232-59-194.ap-south-1.compute.amazonaws.com:9000/events?page=2");
  }

  getcategories(){
    return this.http.get<category>("http://ec2-13-232-59-194.ap-south-1.compute.amazonaws.com:9000/categories");
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
    return this.http.put<Event>(`http://localhost:8000/user/${userId.username}/events/${eventId}`,body)
  }

  getoneevent(id){
    console.log(id);
    return this.http.get(`http://localhost:8000/events/${id}`);
  }

  postEventImage(fd,id){
    console.log(fd);
    const form =new FormData();
    form.append('image',fd,fd.name);
    return this.http.post(`http://localhost:8000/addevent/${id}`,form);
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
  
  id:string
  singleIdDetails(holdId){
    this.id = holdId;
  }

  returnsingleIdDetails(){
    return this.id;
  }
}
