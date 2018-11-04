import {
    Component,
    OnInit
} from '@angular/core';
import { Router } from "@angular/router";
import { UserLoginService } from "../../service/user-login.service";
import {
  ChallengeParameters,
  CognitoCallback,
  LoggedInCallback
} from "../../service/cognito.service";
import { DynamoDBService } from "../../service/ddb.service";


@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  Logged: boolean;
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
        value:"my profile",
        routerlink: "/myprofile"
    }
  ];

  constructor(public router: Router, public userService: UserLoginService) {
    this.userService.isAuthenticated(this);
    console.log("constructor");
    this.Logged = userService.islogged();
  }

  isLoggedIn() {
    console.log(this.Logged)
    return this.Logged;
  }

  ngOnInit() {}
}
