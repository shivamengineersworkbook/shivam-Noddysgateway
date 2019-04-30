import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from './../interfaces/postuserevent';
import { userInfo } from 'os';
import { Record } from './../interfaces/getuserevents';
import { category } from './../interfaces/eventcategories';
import { MainEvent } from './../interfaces/getallevents';
import { filters } from './../interfaces/filters';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  baseurl = "http://ec2-13-232-59-194.ap-south-1.compute.amazonaws.com:9000";

  getfilteredevents(details) {
    console.log(details);
    return this.http.get<MainEvent>('http://ec2-13-232-59-194.ap-south-1.compute.amazonaws.com:9000/events?page=1');
  }

  getfilterevents(details:filters, page:number) {
    console.log(details);
    return this.http.get<MainEvent>(`${this.baseurl}/events?page=${page}`);
  }

  getcategories(){
    return this.http.get<category>('http://ec2-13-232-59-194.ap-south-1.compute.amazonaws.com:9000/categories');
  }

  addUserEvents(userId, body){
    console.log(body);
    return this.http.post<Event>(`http://ec2-13-232-59-194.ap-south-1.compute.amazonaws.com:9000/users/${userId.username}/events`, body);
  }
  getuserevents(userId){
    return this.http.get< Record>(`http://ec2-13-232-59-194.ap-south-1.compute.amazonaws.com:9000/users/${userId.username}/events`);
  }

  deleteuserevents(userId, eventId) {
    return this.http.delete(`http://ec2-13-232-59-194.ap-south-1.compute.amazonaws.com:9000/users/${userId.username}/events/${eventId}`);
  }

  updateuserevents(userId, eventId, body) {
    return this.http.put<Event>(`http://localhost:8000/users/${userId.username}/events/${eventId}`, body);
  }

  getoneevent(id){
    console.log(id);
    return this.http.get(`http://ec2-13-232-59-194.ap-south-1.compute.amazonaws.com:9000/events/${id}`);
  }

  postEventImage(fd: File){
    console.log(fd);
    console.log(fd.name);
    const form = new FormData();
    form.append('image', <File>fd, fd.name);
// tslint:disable-next-line: max-line-length
    return this.http.post(`http://ec2-13-232-59-194.ap-south-1.compute.amazonaws.com:9000/users/abc/image/`, form, { headers: {'Content-Type': 'multipart/form-data'} });
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
