import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatRoomModel } from '../models/chat-room.model';
import { ChatRoomService } from '../services/chat-room.service';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-group',
  templateUrl: './update-group.component.html',
  styleUrls: ['./update-group.component.scss']
})
export class UpdateGroupComponent implements OnInit {

  term!: string;
  filterMessages!: string;
  interestsLength!: any[];
  opened: boolean = false;
  chatRoomId!: string;
  chatRoomForm!: FormGroup;
  userList!: any[];
  chatRoom!: ChatRoomModel;
  chatTypeList: string[] = [
    'public',
    'private'
  ]

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
  private userService: UserService,
  private activatedRouter: ActivatedRoute,
  private router: Router,
  private fb: FormBuilder,
  private messageService: MessageService,
  private chatRoomService: ChatRoomService,
  private dialog: MatDialog) {
    this.chatRoomId = data;
   }

  ngOnInit(): void {
    console.log(this.chatRoomId, "buongirona");
    this.initForm();

    this.chatRoomService.getChatRoomAfterClick(this.chatRoomId).subscribe((data) => {
      this.chatRoom = data;

      this.editForm();
    })
  }

  initForm() {
    this.chatRoomForm = new FormGroup({
      chatName: this.fb.control(''),
      chatType: this.fb.control(''),
    })
  }

  editForm() {
    this.chatRoomForm.patchValue({
      chatName: this.chatRoom.chatName,
      chatType: this.chatRoom.chatType
    })
  }

  onSubmit(formValue: any) {
    this.chatRoom.chatName = formValue.chatName;
    this.chatRoom.chatType = formValue.chatType;

    this.chatRoomService.updateChatRoomGroup(this.chatRoomId, this.chatRoom).subscribe((data) => {

    })
  }
}
