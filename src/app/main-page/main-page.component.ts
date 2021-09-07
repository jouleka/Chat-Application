import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  opened: boolean = false;
  notifications = 3;
  userId!: any;
  newUser: UserModel = new UserModel();
  user!: UserModel;

  constructor( private router: Router, private toastr: ToastrService,
    private userService: UserService, private activatedRouter: ActivatedRoute ) {}

  ngOnInit(): void {
    this.userId = this.activatedRouter.snapshot.paramMap.get('id');
    console.log(this.userId);

    this.loggedUser();

  }

  userLogOut(id: any) {
    this.userService.logoutUserProfile(id, this.newUser).subscribe((data) => {
      console.log(data);
      this.onLogOut();
    })
  }

  loggedUser() {
    // this.userId = this.activatedRouter.snapshot.paramMap.get('id');
    console.log(this.userId);

    this.userService.logedInUser(this.userId).subscribe((data) => {
      console.log(data);
      this.user = data;
      console.log(this.user.fullname);
      this.goToGroupsPage();
    })
  }

  onLogOut() {
    this.router.navigate(['api/user/login']);
  }

  goToEditPage() {
    this.router.navigate(['edit/'+ this.userId], {relativeTo: this.activatedRouter});
  }

  goToChatsPage() {
    this.router.navigate(['chat-page/'+ this.userId], {relativeTo: this.activatedRouter});
  }

  goToGroupsPage() {
    this.router.navigate(['groups-page/'+ this.userId], {relativeTo: this.activatedRouter});
  }

  goToFindGroupsPage() {
    this.router.navigate(['find-groups/'+ this.userId], {relativeTo: this.activatedRouter});
  }

  goToFavouriteFriendsPage() {
    this.router.navigate(['favourites-page/'+ this.userId], {relativeTo: this.activatedRouter});
  }

  goToLogin() {
    this.router.navigate(['api/user/login']);
  }

}
