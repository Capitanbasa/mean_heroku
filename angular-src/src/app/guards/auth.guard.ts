import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private router : Router,
        private authservice : AuthService
    ) { }

    canActivate(){
        if(this.authservice.loggedIn()){
            return true;
        }else{
            this.router.navigate(['/login']);
        }
    }
}