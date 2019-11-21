

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private database:AngularFireDatabase){}

  save(user:firebase.User){
    this.database.object('/users/'+ user.uid).update({
      name:user.displayName,
      email:user.email
    })
  }
  get(uid:string): AngularFireObject<AppUser> {
    return this.database.object('/users/'+uid);
  }
}
