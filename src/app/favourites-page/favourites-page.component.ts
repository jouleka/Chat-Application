import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-favourites-page',
  templateUrl: './favourites-page.component.html',
  styleUrls: ['./favourites-page.component.scss']
})
export class FavouritesPageComponent implements OnInit {

  term!: string;
  groupsTerm!: string;
  interestsLength!: any [];
  opened: boolean = false;
  openedGroups: boolean = false;
  favorite: boolean = false;
  userChattingWith: UserModel = new UserModel();
  fvUserList!: any[];
  fvGroupsList!: any[];
  usersChattingWithList!: any[];
  userId!: any;
  openedChat: boolean = false;

  constructor(private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {

    this.userId = this.activatedRouter.snapshot.paramMap.get('id');
    this.getAllUsersFromFvList();
    this.getAllGroupsFromFvList();
  }

  // getAllUsers() {
  //   this.userService.getAllUsers(this.userId).subscribe((data) => {
  //     this.userList = data;
  //   })
  // }

  getAllUsersFromFvList() {
    this.userService.getFavouriteChats(this.userId).subscribe((data) => {
      this.fvUserList = data;

    })
  }

  removeUserFromFavouritesPage(friendId: string) {
    this.userService.removeUserFromFavouritesPage(this.userId, friendId).subscribe((data) => {
      this.getAllUsersFromFvList();
    })
  }

  getAllGroupsFromFvList() {
    this.userService.getFavouriteGroups(this.userId).subscribe((data) => {
      this.fvGroupsList = data;
      console.log("hi im groupList: ", this.fvGroupsList);

    })
  }

  removeGroupFromFavouritesGroups(groupId: string) {
    this.userService.removeUserFromFavouritesGroups(this.userId, groupId).subscribe((data) => {
      this.getAllGroupsFromFvList();
    })
  }

  goToFavouritesPage() {
    this.router.navigate(['api/user/main-page/' +this.userId + "/favourites-page/" + this.userId]);
  }

  goToChatPage() {
    this.router.navigate(['api/user/main-page/' + this.userId + "/chat-page/" + this.userId]);
  }

  goToGroupsPage() {
    this.router.navigate(['api/user/main-page/' +this.userId + "/groups-page/" + this.userId]);
  }

}
