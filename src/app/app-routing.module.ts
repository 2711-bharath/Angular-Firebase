import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { EditFriendComponent } from './edit-friend/edit-friend.component';
import { FriendListComponent } from './friend-list/friend-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/register-friend', pathMatch: 'full' },
  { path: 'register-friend', component: AddFriendComponent },
  { path: 'view-friends', component: FriendListComponent },
  { path: 'edit-friend/:id', component: EditFriendComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
