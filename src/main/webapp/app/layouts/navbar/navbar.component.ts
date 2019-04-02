import {
    Component,
    OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginService } from '../../service/user-login.service';
import {
  CognitoCallback,
  CognitoUtil,
  LoggedInCallback
} from '../../service/cognito.service';
import { EventsService} from '../../service/events.list.service';
import {ServicefilterService} from '../../service/servicefilter.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  bAuthenticated = false;
  LocationNav: String= 'Delhi';
  cities = [
    {
      value: 'Delhi',
      viewValue: 'Delhi'
    },
    {
      value: 'Mumbai',
      viewValue: 'Mumbai'
    },
    {
      value: 'Kolkata',
      viewValue: 'Kolkata'
    },
    {
      value: 'Chennai',
      viewValue: 'Chennai'
    },
    {
      value: 'Bangalore',
      viewValue: 'Bangalore'
    }
  ];

  links = [
    {
      value: 'logout',
      routerlink: '/logout'
    },
    {
      value: 'my profile',
      routerlink: '/myprofile'
    }
  ];

  constructor(
    public router: Router,
    public userService: UserLoginService,
    public cognitoutil: CognitoUtil,
    public events: EventsService,
    public filter: ServicefilterService
  ) {
    console.log('constructor');
  }



  ngOnInit() {

  }



  changeLoc(data){
    console.log(this.LocationNav);
    console.log(data.value);
    this.filter.sendnavfilters(data.value);
  }




  isLoggedIn() {
    const cognitoUser = this.cognitoutil.getCurrentUser();
    if (cognitoUser == null) {
      this.bAuthenticated = false;
    } else {
      this.bAuthenticated = true;
    }
    return this.bAuthenticated;
  }
}
