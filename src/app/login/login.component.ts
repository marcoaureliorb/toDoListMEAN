import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isShow: boolean = false;
  checkoutForm: FormGroup;
  isValid = true;
  errMsg = '';

  constructor(private router: Router, private formBuilder: FormBuilder, private loginService: LoginService) { 
    this.checkoutForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: ''
    });
  }

  ngOnInit() {
  }

  login(form) {
      console.log(form);

      var user = form.user;
      var password = form.password;
      
      if(this.loginService.login(user, password)){
        this.router.navigate(['main']);
      }
      else{
       this.isValid = false;
       this.errMsg = 'invalid user';
      }
  }
}
