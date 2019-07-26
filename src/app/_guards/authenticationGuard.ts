import {AuthenticationService } from '../_services/AuthenticationService';
import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class AuthenticationGard implements CanActivate {

    constructor(private authenticationService: AuthenticationService , private router: Router) {
    }

    canActivate() {
        if (this.authenticationService.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
}
