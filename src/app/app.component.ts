import { Component, OnInit  } from '@angular/core';
import { AuthenticationService } from 'AuthenticationService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  isShow: boolean;

  title = 'toDoList';

  constructor(private authenticatorService: AuthenticationService){

  }

  ngOnInit() {
    this.isShow = this.authenticatorService.isAuthenticated();
    console.log(this.isShow);
  }
}
