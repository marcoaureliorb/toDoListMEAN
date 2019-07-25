import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'AuthenticationService';
import { User } from '../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string;
  subscription: Subscription;

  constructor(private authenticatorService: AuthenticationService) {
    this.userName = '';
   }

  ngOnInit() {
    this.userName =  this.authenticatorService.currentUser.firstName;
  }
}
