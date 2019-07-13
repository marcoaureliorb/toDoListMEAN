import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable()
export class AuthenticationService {
    
    currentUser: User = null;
    userDatabase = 'users';
  
    constructor() { }

    login(user: string, pass: string){
  
      var users = this.getUsersFromLocalStorage();
  
      var usuario = users.filter(x => x.email == user && x.pass == pass);
  
      if(usuario.length > 0){
          this.currentUser = usuario[0];
          return true;
      }

      return false;
    }
  
    getUsersFromLocalStorage(): Array<User> {
      const users  = JSON.parse(localStorage.getItem(this.userDatabase));
      return users || [];
    }  


    isAuthenticated(){
        console.log(this.currentUser);
        
        return this.currentUser != null;
    }
}
