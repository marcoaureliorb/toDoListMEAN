import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fg : FormGroup;
  isValid = true;
  errMsg = '';
  registerOk = false;

  constructor(private formBuilder : FormBuilder, private router: Router, private userService : UserService) { }

  ngOnInit() {
    this.fg = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    }); 
  }

  register(form){
    const {firstName, lastName, email, password}  = form;

    try{
      const user = new User({firstName, lastName, email, password});
      this.userService.register(user);
      this.registerOk = true;
    }
    catch(e){
      this.isValid = false;
      this.errMsg = e;
    }
  }
}
