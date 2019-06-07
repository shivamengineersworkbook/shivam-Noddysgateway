import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from './../interfaces/postuserevent';
import { userInfo } from 'os';
import { Record } from './../interfaces/getuserevents';
import { category } from './../interfaces/eventcategories';
import { MainEvent } from './../interfaces/getallevents';
import { filters } from './../interfaces/filters';
import { ModelEvent } from './../interfaces/singleevent';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  baseurl = "http://ec2-13-232-59-194.ap-south-1.compute.amazonaws.com:9000";

  // This function is being called for the front page
  getfilteredevents(details) {
    console.log(details);
    return this.http.get<MainEvent>(`${this.baseurl}/events?page=1`);
  }

  //this function is being called for the activities page
  getfilterevents(details:filters, page:number) {
    console.log(details);
    let max = 0;
    let age:number;
    for(age of details.ages){
      if( age > max){
        max = age;
      }
    }
    // return this.http.get<MainEvent>(`${this.baseurl}/events?page=${page}&city=${details.location}&category=${details.categories[0]}&event_provider=${details.provider}&event_max_age=${max}`);
    return this.http.get<MainEvent>(`${this.baseurl}/events?page=${page}&city=${details.location}`);
  }

  getcategories(){
    return this.http.get<category>(`${this.baseurl}/categories`);
  }

  addUserEvents(userId, body){
    console.log(body);
    return this.http.post(`${this.baseurl}/users/${userId.username}/events`, body, {responseType:'text'});
  }
  getuserevents(userId){
    return this.http.get< Record>(`${this.baseurl}/users/${userId.username}/events`);
  }

  deleteuserevents(userId, eventId) {
    return this.http.delete(`${this.baseurl}/users/${userId.username}/events/${eventId}`,{responseType:'text'} );
  }

  updateuserevents(userId, eventId, body) {
    return this.http.put<Event>(`${this.baseurl}/users/${userId.username}/events/${eventId}`, body);
  }

  getoneevent(id){
    console.log(id);
    return this.http.get<ModelEvent >(`${this.baseurl}/events/${id}`);
  }

  postEventImage(fd: File, user){
    console.log(fd);
    console.log(fd.name);
    const form = new FormData();
    form.append('file', <File>fd, fd.name);
// tslint:disable-next-line: max-line-length
    return this.http.post(`${this.baseurl} /users/${user.username}/image`, form, {responseType:'text'});
  }

  user: string;
  event: string;
  savingDetails(userId, eventId) {
      this.user = userId.username;
      this.event = eventId;
  }

  returningDetails(){
     return this.event;
  }
  
  id: string;
  singleIdDetails(holdId){
    this.id = holdId;
  }

  returnsingleIdDetails(){
    return this.id;
  }
}
