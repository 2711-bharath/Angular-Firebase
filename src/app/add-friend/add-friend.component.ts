import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit {
  public FriendForm: FormGroup;
  constructor(public crudApi: CrudService, public fb: FormBuilder, public toastr: ToastrService, public router: Router) { }

  ngOnInit(): void {
    this.crudApi.GetFriendsList();
    this.friendForm();
  }

  friendForm(){
    this.FriendForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })  
  }

  get firstName() {
    return this.FriendForm.get('firstName');
  }

  get lastName() {
    return this.FriendForm.get('lastName');
  }  

  get email() {
    return this.FriendForm.get('email');
  }

  get mobileNumber() {
    return this.FriendForm.get('mobileNumber');
  }

  ResetForm() {
    this.FriendForm.reset();
  }  

  submitFriendData() {
    this.crudApi.AddFriend(this.FriendForm.value);
    this.toastr.success(this.FriendForm.controls['firstName'].value + ' successfully added!');
    this.ResetForm();
    this.router.navigateByUrl("/view-friends");
   };
}
