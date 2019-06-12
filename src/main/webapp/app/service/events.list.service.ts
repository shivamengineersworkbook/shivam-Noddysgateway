import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from './../interfaces/postuserevent';
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
    let filter = '';
    if(details.location!="") {
      
      filter = filter + '&city=' + details.location;
    } 
    if(details.categories.length > 0){
      filter = filter + '&event_category=' + details.categories[0];
      console.log(filter)
    } 
    if(details.ages.length > 0) {
      let max = 0;
    let age:number;
    for(age of details.ages){
      if( age > max){
        max = age;
      }
    }
      filter = filter + `&event_max_age_to=` + max;
      console.log(filter);
    } 
    if(details.provider.length > 0){
      filter = filter + '&event_provider=' + details.provider[0];
    } 
    if(details.eventName!="") {
      filter = filter + '&event_name=' + details.eventName;
    }
    if(details.timerange.length > 0) {
      filter = filter + '&event_end_time_to=' + details.timerange[1] + ':00';
      filter = filter + '&event_start_time_from=' + details.timerange[0] + ':00';
    }
    // if(details.location){
    //   this.filter = this.filter + '&city=' + details.location;
    // } 
    console.log(filter);
    return this.http.get<MainEvent>(`${this.baseurl}/events?page=${page}${filter}`);
  }

  getcategories(){
    return this.http.get<category>(`${this.baseurl}/categories?size=20`);
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
    return this.http.post(`${this.baseurl}/users/${user.username}/image`, form,{responseType:'text'});
  }

  user: string;
  event: string;
  eventName: string;
  eventDate: string;
  gettingHomeFilters(Name, evDate) {
    this.eventName = Name;
    this.eventDate = evDate; 
  }

  returningHomeDate() {
    return this.eventDate;
  }

  returningHomeName() {
    return this.eventName;
  }


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
