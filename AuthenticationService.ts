import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
    
    public currentUser: User = null;
    userDatabase = 'users';
  
    constructor() {
     }

    login(user: string, pass: string){
  
      var users = this.getUsersFromLocalStorage();
  
      var usuario = users.filter(x => x.email == user && x.password == pass);
  
      if(usuario.length > 0){
          this.currentUser = usuario[0];
          return true;
      }

      return false;
    }

    isAuthenticated() {
      return this.currentUser != null;
    }    

    register(firstName: string, lastName: string, email: string, password: string) {
      
      let users = this.getUsersFromLocalStorage();

      if( users.filter(x => x.email === email).length){
        throw new Error('Email "a" is already taken.');
      }

      const user = new User({id: users.length + 1, firstName, lastName, email, password});  
      users.push(user);
      this.setUsersToLocalStorage(users);
    }    
  
    getUsersFromLocalStorage(): Array<User> {
      const users  = JSON.parse(localStorage.getItem(this.userDatabase));
      return users || [];
    }  

    setUsersToLocalStorage(users: Array<User>) {
      const newUsers  = JSON.stringify(users);
      localStorage.setItem(this.userDatabase, newUsers);
    }      
}
