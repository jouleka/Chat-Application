import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  newUser: UserModel = new UserModel();

  constructor(
    private userService: UserService, private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private activateRouter: ActivatedRoute,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
  }

  refresh() {
    window.location.reload();
  }

  createNewUser() {

    this.userService.createUserProfile(this.newUser).subscribe((data) => {
      console.log(data);
      this.showSuccess();
      this.goToLoginPage();
    }, (error) => {
      if(this.newUser.name.length === 0 || this.newUser.name === undefined) {
        this.showErrorIfNameisEmpty();
      }else if(this.newUser.surname.length === 0) {
        this.showErrorIfSurnameisEmpty();
      }else if(this.newUser.username.length === 0) {
        this.showErrorIfUsernameisEmpty();
      }else if(this.newUser.email.length === 0) {
        this.showErrorIfEmailisEmpty();
      }else if(this.newUser.password.length === 0) {
        this.showErrorIfPasswordisEmpty();
      }else {
        this.showErrorIfEmailOrUsernameAlreadyExist();
      }
    })
  }

  onSubmit() {
    this.createNewUser();
  }

  goToLoginPage() {
    this.router.navigate(['api/user/login']);
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  showSuccess() {
    this.toastr.success('Account created successfully.', 'Success!')
  }

  showErrorIfEmailAlreadyExists() {
    this.toastr.error('The same email has already been associated with another account. Please do try again.', 'Error!')
  }

  showErrorIfEmailOrUsernameAlreadyExist() {
    this.toastr.error('The same email or username has already been associated with another account. Please do try again.', 'Error!')
  }

  showErrorIfNameisEmpty() {
    this.toastr.error('Name field cannot be empty! Please do try again.', 'Error!')
  }

  showErrorIfSurnameisEmpty() {
    this.toastr.error('Surname field cannot be empty! Please do try again.', 'Error!')
  }

  showErrorIfUsernameisEmpty() {
    this.toastr.error('Username field cannot be empty! Please do try again.', 'Error!')
  }

  showErrorIfEmailisEmpty() {
    this.toastr.error('Email field cannot be empty! Please do try again.', 'Error!')
  }

  showErrorIfPasswordisEmpty() {
    this.toastr.error('Email field cannot be empty! Please do try again.', 'Error!')
  }

  showErrorIfUsernameAlreadyExists() {
    this.toastr.error('Username has already been taken please do try a different one', 'Error!')
  }
}
