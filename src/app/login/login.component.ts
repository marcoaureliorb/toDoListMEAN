import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/AuthenticationService';


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
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['main']);
    }
   }

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: false
    });
  }

  get f() { return this.checkoutForm.controls; }

  login(form) {
      this.submitted = true;

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
