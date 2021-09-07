import { Component, OnInit } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import * as $ from "jquery"
import { ActivatedRoute, Router } from '@angular/router';
import { ChatRoomService } from '../services/chat-room.service';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import { ChatRoomModel } from '../models/chat-room.model';
import { InjectionToken } from '@angular/core';
import { MatDialog, MatDialogClose, MatDialogConfig } from '@angular/material/dialog';
import { GroupDialogBoxComponent } from '../group-dialog-box/group-dialog-box.component';
import { ThrowStmt } from '@angular/compiler';
import { MessageModel } from '../models/message.model';
import { UserModel } from '../models/user.model';
import { UpdateGroupComponent } from '../update-group/update-group.component';
import { DeleteChatGroupDialogComponent } from '../delete-chat-group-dialog/delete-chat-group-dialog.component';
import { RemoveUserDialogComponent } from '../remove-user-dialog/remove-user-dialog.component';
import { UpdateMessageComponent } from '../update-message/update-message.component';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent implements OnInit {

  MAT_DIALOG_DATA!: InjectionToken<any>;
  private serverUrl = 'http://localhost:8080/socket'
  private newTitle: string = 'WebSockets chat';
  private stompClient: any;
  term!: string;
  filterMessages!: string;
  filterParticipants!: string;
  interestsLength!: any[];
  message: MessageModel = new MessageModel();
  opened: boolean = false;
  userId!: any;
  userList!: any[];
  newChatRoom: ChatRoomModel = new ChatRoomModel();
  groupChatRoomList!: any[];
  inactiveGroupChatRoomList!: any[];
  favorite: boolean = false;
  chatRoomAfterClick: ChatRoomModel = new ChatRoomModel();
  openedChat: boolean = false;
  openedParticipantsPage: boolean = false;
  participantsList!: any[];
  chatRoomId!: any;
  currentUser: UserModel = new UserModel();
  chatRoomMessages: any [] = [];
  userByChatRoomId: UserModel = new UserModel();
  ischatRoomActive: boolean = false;
  isChatAdminIdEqualTouserId: boolean = false;
  messageList: any[] = [];
  isUserIdEqualToMessageSenderId: boolean = false;
  isUserIdSameAsMessageSenderId: boolean = false;
  messageById!: MessageModel;

  constructor(private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private chatRoomService: ChatRoomService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userId = this.activatedRouter.snapshot.paramMap.get('id');

    this.initializeWebSocketConnection();
    this.getCurrentUserModel();
    this.getAllUsers();
    this.getChatRoomGroups();
    this.getInactiveChatRoomGroups();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame: any) {
      that.stompClient.subscribe('/chat/public', (message: any) => {

        let incomingMsg = JSON.parse(message.body);
        console.log('type of message : ', incomingMsg);

        if(incomingMsg.chatId === that.chatRoomId) {
          that.messageList.push(incomingMsg);
          console.log("Im the message List : ", that.messageList);
        }

        // if (incomingMsg) {
        //   $('.chat').append("<div class='message'>" + incomingMsg + '</div>');
        //   console.log('webSocketMEssage -  ',  + incomingMsg);
        // }
      });
    }); this.getChatRoomGroups();
    this.getInactiveChatRoomGroups();
  }

  sendMessage(message: any) {
    const messageToSend: any = {
      usernameOfSender: this.currentUser.fullname,
      userId: this.userId,
      chatId: this.chatRoomId,
      usersSoftDeletingMessage: [],
      text: message,
    };

    this.stompClient.send('/app/send/message', {}, JSON.stringify(messageToSend));


    $('#input').val('');
    // this.postMessage(message);
  }

  postMessage(messageText: any) {
    this.message.text = messageText;
    this.message.userId = this.userId;
    this.message.chatId =  this.chatRoomId;
    this.message.usernameOfSender = this.currentUser.fullname;
    this.messageService.postMessage(this.userId,this.message).subscribe(data => {
      console.log(data);
      console.log(JSON.parse(data).id, "heyyyyyyy");

      // this.currentChatRoom.messagesId = JSON.parse(data).id;
      // this.getUserChattingWith(this.chattingUserId);
      // this.listUSersChattingWith();
      this.getChatRoomAfterClick(this.chatRoomId);
      this.getChatRoomGroups();
    })
  }

  getMessageByChatId(id: any) {
    this.messageService.getMessageByChatId(id, this.userId).subscribe((data) => {
      this.chatRoomMessages = data;
      this.messageList = data
    })
  }

  getMessageById(messageId: string) {
    this.messageService.getMessageById(messageId).subscribe((data) => {
      this.messageById = data;
      console.log(this.messageById ," : itsmeeeee");


      if(this.messageById.userId === this.currentUser.id) {
        this.isUserIdSameAsMessageSenderId = true;
      }else {
        this.isUserIdSameAsMessageSenderId = false;
      }
    })
  }

  deleteMessageById(id: any) {
    this.messageService.deleteMessageById(id).subscribe((data) => {
      console.log(data);
      this.getChatRoomAfterClick(this.chatRoomId)
    })
  }

  leaveChatRoomGroup() {
    this.userService.leaveChatRoomGroup(this.chatRoomId, this.userId).subscribe((data) => {
      this.getChatRoomAfterClick(this.chatRoomId);
      this.getChatRoomGroups();
      this.getInactiveChatRoomGroups();
    })
  }

  getAllUsers() {
    this.userService.listAllUsersOnGroupsPage(this.userId).subscribe((data) => {
      this.userList = data;
    })
  }

  getCurrentUserModel() {
    this.userService.getCurrentUserId(this.userId).subscribe((data) => {
      console.log(data);
      this.currentUser = data;

    })
  }

  getUserByChatRoomAdminId() {
    this.userService.getUserByChatRoomAdminId(this.chatRoomId).subscribe((data) => {
      this.userByChatRoomId = data;
    })
  }

  getChatRoomAfterClick(id: string) {
    this.chatRoomService.getChatRoomAfterClick(id).subscribe((data) => {
      console.log(data);
      this.chatRoomAfterClick = data;
      this.chatRoomId = data.id;



      this.getParticipantsByChatRoomGroupId(id);
      this.getMessageByChatId(id);
      this.getUserByChatRoomAdminId();

    })
  }

  getChatRoomGroups() {
    this.chatRoomService.getChatRoomGroups(this.userId).subscribe((data) => {
      console.log(data);
      this.groupChatRoomList = data;
    })
  }

  getInactiveChatRoomGroups() {
    this.chatRoomService.getInactiveChatRoomGroups(this.userId).subscribe((data) => {
      this.inactiveGroupChatRoomList = data
    })
  }

  getParticipantsByChatRoomGroupId(id: string) {
    this.userService.getUsersByChatRoomGroupId(id).subscribe((data) => {
      console.log(data);
      this.participantsList = data;
      console.log(this.participantsList);



      if(this.chatRoomAfterClick.adminId === this.userId) {
        this.isChatAdminIdEqualTouserId = true;
      }else if(this.chatRoomAfterClick.adminId !== this.userId) {
        this.isChatAdminIdEqualTouserId = false;
      }

      if(this.chatRoomAfterClick.usersId!.includes(this.userId)) {
        this.ischatRoomActive = false;
      }else if(this.chatRoomAfterClick.inactiveUsersId!.includes(this.userId)) {
        this.ischatRoomActive = true;
      }
    })
  }

  createChatRoomDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.userId;
    let dialogRef = this.dialog.open(GroupDialogBoxComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.getChatRoomGroups();
    })
  }

  removeUserFromChatRoom(participantId: string) {
    this.chatRoomService.removeUserFromChatRoom(this.chatRoomId, this.userId, participantId).subscribe((data) => {
      console.log(data);
      this.getParticipantsByChatRoomGroupId(this.chatRoomId);
    })
  }

  deleteChatRoomGroup() {
    this.chatRoomService.deleteChatRoomGroup(this.chatRoomId).subscribe((data) => {
      this.getChatRoomGroups();
      this.getInactiveChatRoomGroups();
    })
  }

  updateChatRoomGroupDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.chatRoomId;
    let dialogRef = this.dialog.open(UpdateGroupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.getChatRoomGroups();
      this.getInactiveChatRoomGroups();
    })
  }

  deleteGroupsDialog() {
    let dialogRef = this.dialog.open(DeleteChatGroupDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if(`${result}` == 'true') {
        this.deleteChatRoomGroup();
      }
    })
  }

  removeUserFromGroupDialog(id: string) {
    let dialogRef = this.dialog.open(RemoveUserDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if(`${result}` == 'true') {
        this.removeUserFromChatRoom(id);
      }
    })
  }

  updateMessageDialog(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = id;
    let dialogRef = this.dialog.open(UpdateMessageComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.getChatRoomAfterClick(this.chatRoomId);
    })
  }

  addGroupToFavouriteGroups() {
    console.log( "hi im the chatroomId", this.chatRoomId);

    this.userService.addUserToFavouriteGroups(this.userId, this.chatRoomId).subscribe((data) => {
      this.goToFavouritesPage();
    })
  }

  softDeleteAMessage(messageId: string) {
    this.messageService
      .softDeleteAMessage(messageId, this.userId)
      .subscribe((data) => {
        this.getChatRoomAfterClick(this.chatRoomId);
      });
  }

  goToFavouritesPage() {
    this.router.navigate(['api/user/main-page/' +this.userId + "/favourites-page/" + this.userId]);
  }

  onCreationOfChatRoom(id: string) {

  }

  onClick(event: any, row: any) {
    row = this.favorite;
    row = !row;
  }
}
