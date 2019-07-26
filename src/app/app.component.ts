import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription }   from 'rxjs';
import { AuthenticationService } from 'src/app/_services/AuthenticationService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  isShow: boolean;
  subscription: Subscription;
  title = 'toDoList';

  constructor(private authenticatorService: AuthenticationService ){
    this.authenticatorService.currentUser.subscribe(x => this.isShow = x != null);    
  }

  ngOnInit() {
    this.isShow = this.authenticatorService.currentUserValue != null;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }   
}
