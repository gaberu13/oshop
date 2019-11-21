import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/switchMap'
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
    this.user$ = afAuth.authState;
  }


  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(result => {
      if (result) {
        this.userService.save(result.user);
        this.router.navigateByUrl(returnUrl);
      }
    });
    console.log("LOGGED INNNN!!!!")

  }
  logout() {
    this.afAuth.auth.signOut();
    console.log("LOGGED OUT")
  }
  get appUser$(): Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (user)
          return this.userService.get(user.uid).valueChanges()
        return Observable.of(null);
      });

  }
}
