import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  login(user, pass){
    if(user === 'marcoaureliorb@gmail.com' && pass === '123456'){
      return true;
    }
    else{
      return false;
    }
  }
}
