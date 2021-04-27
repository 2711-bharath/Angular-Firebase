import { Injectable } from '@angular/core';
import { Friend } from './friend';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  friendsRec: AngularFireList<any>;
  friendRec: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  // create friend
  AddFriend(friend: Friend){
    this.friendsRec.push({
      firstName: friend.firstName,
      lastName: friend.lastName,
      email: friend.email,
      mobileNumber: friend.mobileNumber
    })
  }

  // fetch single friend object
  GetFriend(id: String){
    this.friendRec = this.db.object('friends-list/'+id);
    return this.friendRec;
  }

  // Fetch Students List
  GetFriendsList() {
    this.friendsRec = this.db.list('friends-list');
    return this.friendsRec;
  }  

  // Update friend Object
  UpdateFriend(friend: Friend){
    this.friendRec.update({
      firstName: friend.firstName,
      lastName: friend.lastName,
      email: friend.email,
      mobileNumber: friend.mobileNumber
    })
  }

  // Delete friend object
  DeleteFriend(id: String){
    this.friendRec = this.db.object('friends-list/'+id);
    this.friendRec.remove();
  }
}
