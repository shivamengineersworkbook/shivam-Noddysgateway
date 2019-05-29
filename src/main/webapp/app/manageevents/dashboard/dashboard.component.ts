import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserLoginService } from "../../service/user-login.service";
import { EventsService} from '../../service/events.list.service';
import { CognitoUser } from 'amazon-cognito-identity-js';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {
  CognitoCallback,
  CognitoUtil,
  LoggedInCallback
} from "../../service/cognito.service";
import { ModalService } from './../../service/modal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  constructor(public router: Router,
    public userService: UserLoginService,
    public cognitoutil: CognitoUtil,
    public userEvent: EventsService,
    public dialog: MatDialog,
    private modalService: ModalService) { }

  ngOnInit() {
    this.cognitoUser = this.isLoggedIn();
    console.log(this.cognitoUser);
  }

 
  // Object Getting the user...
  cognitoUser= {}
  isLoggedIn() {
    let cognitoUser = this.cognitoutil.getCurrentUser();
    if (cognitoUser == null) {
      this.router.navigateByUrl("/home/login");
    } else {
      this.cognitoUser = cognitoUser;
       return cognitoUser;
    }
  }

  openModal(id: string) {
    this.modalService.open(id);
}

closeModal(id: string) {
    this.modalService.close(id);
}

}
