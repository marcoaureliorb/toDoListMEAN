import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription }   from 'rxjs';
import { AuthenticationService } from 'AuthenticationService';

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
    this.subscription = authenticatorService.loginObservable.subscribe(
      user => {
        this.isShow = user !== undefined;
    });     
  }

  ngOnInit() {
    this.isShow = this.authenticatorService.isAuthenticated();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }   
}
