import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { Subject }    from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    currentUserLocalStorage = 'currentUser';
    
    constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
     }

     login(email: string, password: string){
        return this.http
                  .post<any>('http://localhost:4200/users/authenticate', { email, password })
                  .pipe(map(user => {
                              if (user) {
                                localStorage.setItem(this.currentUserLocalStorage, JSON.stringify(user));
                                this.currentUserSubject.next(user);
                              }
                              
                              return user;
                            }));
    }

    logout() {
      localStorage.removeItem(this.currentUserLocalStorage);
      this.currentUserSubject.next(null);
    }    

    public get currentUserValue(): User {
      return this.currentUserSubject.value;
    }    

    isAuthenticated() {
      return this.currentUser != null;
    }    
}
