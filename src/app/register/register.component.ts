import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../models/user';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fg: FormGroup;
  isValid = true;
  errMsg = '';
  registerOk = false;
  loading = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.fg = this.formBuilder.group({
      firstName: new FormControl(null, {validators: [Validators.required]}),
      lastName: new FormControl(null, {validators: [Validators.required]}),
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(6)]})
    });
  }

  register(form) {

    if (this.fg.invalid) {
      return;
    }

    const {firstName, lastName, email, password}  = form;

    const user = new User({firstName, lastName, email, password});

    this.loading = true;
    this.userService.register(user)
    .pipe(first())
    .subscribe(
      data => {
        console.log(data);
        this.registerOk = true;
    },
    error => {
      this.loading = false;
      this.isValid = false;
      if(error && error.error && error.error.message){
        this.errMsg = error.error.message;
      }
      else{
        this.errMsg = error;
      }
    });
  }
}
