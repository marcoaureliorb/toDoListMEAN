import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
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
        this.registerOk = true;
    },
    error => {
      this.loading = false;
      this.isValid = false;
      this.errMsg = error.error.message;
    });
  }
}
