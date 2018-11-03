import {
    Component,
    OnInit
} from '@angular/core';
import { Router } from "@angular/router";
import { UserLoginService } from "../../service/user-login.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
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
    console.log("SecureHomeComponent: constructor");
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {
    return isLoggedIn;
  }

  ngOnInit() {}
}
