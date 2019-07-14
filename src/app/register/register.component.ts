import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'AuthenticationService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fg : FormGroup;
  isValid = true;
  errMsg = '';

  constructor(private formBuilder : FormBuilder, private router: Router, private authenticationService : AuthenticationService) { }

  ngOnInit() {
    this.fg = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    }); 
  }

  register(form){
    const firstName = form.firstName;
    const lastName = form.lastName;
    const email = form.email;
    const password = form.password;        

    try{
      this.authenticationService.register(firstName, lastName, email, password);
      this.router.navigate(['']);
    }
    catch(e){
      this.isValid = false;
      this.errMsg = e;
    }
  }
}
