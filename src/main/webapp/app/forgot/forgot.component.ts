import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserLoginService } from "../service/user-login.service";
import { CognitoCallback } from "../service/cognito.service";

@Component({
  selector: "awscognito-angular2-app",
  templateUrl: "./forgot.component.html"
})
export class ForgotPasswordStep1Component implements CognitoCallback {
  email: string;
  errorMessage: string;

  constructor(public router: Router, public userService: UserLoginService) {
    this.errorMessage = null;
  }

  onNext() {
    this.errorMessage = null;
    this.userService.forgotPassword(this.email, this);
  }

  cognitoCallback(message: string, result: any) {
    if (message == null && result == null) {
      //error
      this.router.navigate(["forgotPassword", this.email]);
    } else {
      //success
      this.errorMessage = message;
    }
  }
}
