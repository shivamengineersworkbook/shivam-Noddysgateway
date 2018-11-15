import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getfilteredevents() {
    return this.http
      .get("https://7b3724b6.ngrok.io/events")
      .subscribe(data => {
        console.log(data);
      });
  }


}
