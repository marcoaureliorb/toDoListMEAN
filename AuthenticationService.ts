import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable()
export class AuthenticationService {
  
    currentUser: User = null;
    userDatabase = 'users';
  
    constructor() { }

    login(user: string, pass: string){
  
      var users = this.getUsersFromLocalStorage();
  
      var usuario = users.filter(x => x.email == user && x.password == pass);
  
      if(usuario.length > 0){
          this.currentUser = usuario[0];
          console.log('currentUser:' + this.currentUser);
          return true;
      }

      return false;
    }

    register(firstName: string, lastName: string, email: string, password: string) {
      
      let users = this.getUsersFromLocalStorage();

      if( users.filter(x => x.email === email).length){
        throw new Error('email já cadastrado.');
      }

      const user = new User({id: users.length + 1, firstName, lastName, email, password});  

      console.log(user);
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

    isAuthenticated(){
        console.log(this.currentUser);
        
        return this.currentUser != null;
    }
}
