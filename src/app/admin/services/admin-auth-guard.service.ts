
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';
;





@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth:AuthService,private userService:UserService) { }

  canActivate(): Observable<boolean> {
  return this.auth.appUser$ //user$
  // .switchMap(user => this.userService.get(user.uid).valueChanges())
   .map(appUser=> appUser.isAdmin)
    }
}
