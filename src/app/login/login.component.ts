import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/app/_services/AuthenticationService';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  checkoutForm: FormGroup;
  isValid = true;
  errMsg = '';
  loading = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['main']);
    }
   }

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      email: ['marcoaureliorb@gmail.com', Validators.required],
      password: ['123', Validators.required],
      rememberMe: ''
    });
  }

  login(form) {
      if (this.checkoutForm.invalid) {
        return;
      }

      const {email, password} = form;
      this.loading = true;
      this.isValid = true;

      this.authenticationService.login(email, password)
        .pipe(first())
        .subscribe(data => {
          this.router.navigate(['main']);
        },
        error => {
          this.loading = false;
          this.isValid = false;
          this.errMsg = error.error.message;
        });
  }
}
