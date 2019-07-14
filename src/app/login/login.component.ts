import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from 'AuthenticationService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  checkoutForm: FormGroup;
  isValid = true;
  errMsg = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService : AuthenticationService ) {
    if (this.authenticationService.currentUser) { 
      this.router.navigate(['/']);
    }
   }

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      user: ['marcoaureliorb@gmail.com', Validators.required],
      password: ['marco123', Validators.required],
      rememberMe: ''
    });    
  }

  login(form) {
      const user = form.user;
      const password = form.password;

      if (this.authenticationService.login(user, password)) {
        this.router.navigate(['main']);
      } else {
       this.isValid = false;
       this.errMsg = 'email or password is incorrect';
      }
  }
}
