import {
    Component,
    OnInit
} from '@angular/core';
import { Router } from "@angular/router";
import { UserLoginService } from "../../service/user-login.service";
import {
  CognitoCallback,
  CognitoUtil,
  LoggedInCallback
} from "../../service/cognito.service";



@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  bAuthenticated = false;
  cities = [
    {
      value: "Delhi",
      viewValue: "Delhi"
    },
    {
      value: "Mumbai",
      viewValue: "Mumbai"
    },
    {
      value: "Kolkata",
      viewValue: "Kolkata"
    },
    {
      value: "Chennai",
      viewValue: "Chennai"
    },
    {
      value: "Bangalore",
      viewValue: "Bangalore"
    }
  ];

  links = [
    {
      value: "logout",
      routerlink: "/logout"
    },
    {
      value: "my profile",
      routerlink: "/myprofile"
    }
  ];

  constructor(
    public router: Router,
    public userService: UserLoginService,
    public cognitoutil: CognitoUtil
  ) {
    console.log("constructor");
  }



  ngOnInit() {
    
    
  }

  


  isLoggedIn() {
    let cognitoUser = this.cognitoutil.getCurrentUser();
    if (cognitoUser == null) {
      this.bAuthenticated = false;
    } else {
      this.bAuthenticated = true;
    }
    console.log(this.bAuthenticated);
    return this.bAuthenticated;
  }
}
