import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { Friend } from './../shared/friend'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {
  p: number = 1;
  Friend: Friend[];
  hideWhenNoFriend: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;

  constructor( public crudApi: CrudService, public toastr: ToastrService ) { }

  ngOnInit(): void {
    this.dataState();
    let s = this.crudApi.GetFriendsList(); 
    s.snapshotChanges().subscribe(data => {
      this.Friend = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.Friend.push(a as Friend);
      })
    })
  }

  dataState() {     
    this.crudApi.GetFriendsList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoFriend = false;
        this.noData = true;
      } else {
        this.hideWhenNoFriend = true;
        this.noData = false;
      }
    })
  }
  
  deleteFriend(friend) {
    if (window.confirm('Are sure you want to delete this student ?')) { 
      this.crudApi.DeleteFriend(friend.$key)
      this.toastr.success(friend.firstName + ' successfully deleted!');
    }
  }
}
