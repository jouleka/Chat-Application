import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteChatGroupDialogComponent } from '../delete-chat-group-dialog/delete-chat-group-dialog.component';
import { ChatRoomModel } from '../models/chat-room.model';
import { ChatRoomService } from '../services/chat-room.service';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-group-dialog-box',
  templateUrl: './group-dialog-box.component.html',
  styleUrls: ['./group-dialog-box.component.scss']
})
export class GroupDialogBoxComponent implements OnInit {

  term!: string;
  filterMessages!: string;
  interestsLength!: any[];
  opened: boolean = false;
  userId!: any;
  userList!: any[];
  newChatRoom: ChatRoomModel = new ChatRoomModel();
  chatTypeList: string[] = [
    'public',
    'private'
  ]

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
  private userService: UserService,
  private activatedRouter: ActivatedRoute,
  private router: Router,
  private messageService: MessageService,
  private chatRoomService: ChatRoomService,
  private dialog: MatDialog) {
    this.userId = data;
   }

  ngOnInit(): void {
    console.log(this.userId, "buongirona");
    console.log("hi welocme");

    this.getAllUsers();
  }

  createChatRoom() {
    this.newChatRoom.adminId = this.userId;
    this.chatRoomService.createGroupChatRoom(this.userId, this.newChatRoom).subscribe(data => {
      console.log(data);

    })
  }

  getAllUsers() {
    this.userService.listAllUsersOnGroupsPage(this.userId).subscribe((data) => {
      this.userList = data;
    })
  }

}
