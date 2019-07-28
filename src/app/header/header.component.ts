import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/AuthenticationService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string;
  subscription: Subscription;

  constructor(private router: Router, private authenticatorService: AuthenticationService) {
    this.userName = '';
   }

  ngOnInit() {
    this.userName =  this.authenticatorService.currentUserValue.firstName;
  }

  logout() {
    this.authenticatorService.logout();
    this.router.navigate(['/']);
  }
}
