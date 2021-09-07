import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../models/user.model';
import { CommunicationService } from '../services/communication.service';
import { UserService } from '../services/user.service';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  hide = true;
  newUser: UserModel = new UserModel();
  user!: UserModel;
  userId!: any;
  userInfo!: any[];
  userForm!: FormGroup;
  loginStatus: boolean = false;

  constructor(private router: Router, private toastr: ToastrService,
      private userService: UserService, private fb: FormBuilder, private communicationService: CommunicationService,) { }

  ngOnInit(): void {
    console.log("hey");

  }

  refresh() {
    window.location.reload();
  }

  loginUser() {

    this.userService.loginUserProfile(this.newUser).subscribe(data => {

      this.userId = JSON.parse(data).id;
      console.log(this.userId);

      this.goToMainPage(this.userId);
      this.sendMessage();
    })
  }
  // updateLoginStatus() {
  //   this.communicationService.getMessage().subscribe(message => {
  //     if(message) {
  //       this.loginStatus = true;
  //       console.log(this.loginStatus);

  //     }
  //   })
  // }

  sendMessage() {
    // send message to subscribers via observable subject
    this.communicationService.sendMessage('success');
}

  initForm() {
    this.userForm = new FormGroup({
      username: this.fb.control(''),
      password: this.fb.control(''),
    });
  }

  onSubmit() {
    this.loginUser();
  }

  goToRegisterPage() {
    this.router.navigate(['api/user/register']);
  }

  goToChatPage(id: any) {
    this.router.navigate(['api/user/main-page/chat-page/' + id]);
  }

  goToMainPage(id: any) {
    this.router.navigate(['api/user/main-page/' + id]);
  }

  goToEditPage(id: any) {
    this.router.navigate(['api/user/main-page/edit/' + id]);
  }

  showSuccess() {
    this.toastr.success('Welcome back!', 'Success!')
  }

  showErrorIfUsernameOrPasswordDontMatch() {
    this.toastr.error('Username or password is incorrect. Please do try again.', 'Error!')
  }

}
