import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatRoomModel } from '../models/chat-room.model';
import { MessageModel } from '../models/message.model';
import { ChatRoomService } from '../services/chat-room.service';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-message',
  templateUrl: './update-message.component.html',
  styleUrls: ['./update-message.component.scss']
})
export class UpdateMessageComponent implements OnInit {

  term!: string;
  filterMessages!: string;
  interestsLength!: any[];
  opened: boolean = false;
  messageId!: string;
  messageForm!: FormGroup;
  userList!: any[];
  message!: MessageModel;
  messageAndUserId: any [] = [];
  userId!: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
  private userService: UserService,
  private activatedRouter: ActivatedRoute,
  private router: Router,
  private fb: FormBuilder,
  private messageService: MessageService,
  private chatRoomService: ChatRoomService,
  private dialog: MatDialog) {
    this.messageAndUserId = data;
   }

   ngOnInit(): void {

    this.messageId = this.messageAndUserId[0];
    this.userId = this.messageAndUserId[1];

    console.log(this.messageId, ": hi im the messageId");
    console.log(this.userId, ": hi im the userId");


      this.initForm();

      this.messageService.getMessageById(this.messageId).subscribe((data) => {
        this.message = data;
        this.editForm();
      })
   }

   initForm() {
     this.messageForm = new FormGroup({
       text: this.fb.control('')
     });
   }

   editForm() {
     this.messageForm.patchValue({
       text: this.message.text
     })
   }

   onSubmit(formValue: any) {
     this.message.text = formValue.text;

     this.messageService.updateMessage(this.messageId, this.userId, this.message).subscribe((data) => {
     })
   }

}
