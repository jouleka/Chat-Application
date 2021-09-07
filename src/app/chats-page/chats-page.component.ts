import { UpdateMessageComponent } from './../update-message/update-message.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChatRoomService } from './../services/chat-room.service';
import { UserModel } from './../models/user.model';
import { UserService } from './../services/user.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import * as $ from 'jquery';
import { MessageService } from '../services/message.service';
import { MessageModel } from '../models/message.model';
import { ChatRoomModel } from '../models/chat-room.model';
import { JsonpClientBackend } from '@angular/common/http';

@Component({
  selector: 'app-chats-page',
  templateUrl: './chats-page.component.html',
  styleUrls: ['./chats-page.component.scss'],
})
export class ChatsPageComponent implements OnInit, OnChanges {
  private serverUrl = 'http://localhost:8080/socket';
  private newTitle: string = 'WebSockets chat';
  private stompClient: any;
  message: MessageModel = new MessageModel();
  term!: string;
  filterMessages!: string;
  interestsLength!: any[];
  opened: boolean = false;
  favorite: boolean = false;
  userChattingWith: UserModel = new UserModel();
  userList!: any[];
  usersChattingWithList!: any[];
  userId!: any;
  chattingUserId!: any;
  openedChat: boolean = false;
  newChatRoom: ChatRoomModel = new ChatRoomModel();
  chatRoomId!: any;
  currentUser: UserModel = new UserModel();
  currentChatRoom: ChatRoomModel = new ChatRoomModel();
  chatRoomMessages: any[] = [];
  chatRoomByAdminIdAndChatTypeList: any[] = [];
  currentUserChatting!: string;
  isUserIdSameAsMessageSenderId: boolean = false;
  isUserIdSameAsChatRoomMessagesId: boolean = false;
  messageList: any[] = [];
  newChatRoomId: string = '';
  isFavouriteChat: boolean = false;
  messageById!: MessageModel;
  delete: boolean = false;

  constructor(
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private chatRoomService: ChatRoomService,
    private dialog: MatDialog
  ) {}

  ngOnChanges(changes: SimpleChanges) {}

  ngOnInit(): void {
    this.initializeWebSocketConnection();

    // this.getMessageByChatId(this.currentUserChatting);

    this.userId = this.activatedRouter.snapshot.paramMap.get('id');
    this.getCurrentUserModel();
    this.getAllUsers();
    this.listUSersChattingWith();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame: any) {
      that.stompClient.subscribe('/chat/public', (message: any) => {
        let incomingMsg = JSON.parse(message.body);
        console.log('type of message : ', incomingMsg);

        if (incomingMsg.chatId === that.chatRoomId) {
          that.messageList.push(incomingMsg);
          console.log('Im the message List : ', that.messageList);
        }

        // if (incomingMsg) {
        //   $('.chat').append("<div class='message'>" + incomingMsg + '</div>');
        //   console.log('webSocketMEssage -  ',  + incomingMsg);
        // }
      });
    });
  }

  sendMessage(message: any) {
    const messageToSend: any = {
      usernameOfSender: this.currentUser.fullname,
      userId: this.userId,
      chatId: this.chatRoomId,
      usersSoftDeletingMessage: [],
      text: message,
    };

    this.stompClient.send(
      '/app/send/message',
      {},
      JSON.stringify(messageToSend)
    );

    $('#input').val('');
    // this.postMessage(message);
  }

  postMessage(messageText: any) {
    this.message.text = messageText;
    this.message.userId = this.userId;
    this.message.chatId = this.chatRoomId;
    this.message.usernameOfSender = this.currentUser.fullname;
    this.messageService
      .postMessage(this.userId, this.message)
      .subscribe((data) => {
        // console.log(data);.
        // console.log(JSON.parse(data).id, "heyyyyyyy");

        this.currentChatRoom.messagesId = JSON.parse(data).id;
        this.getUserChattingWith(this.currentUserChatting);
        this.saveIdOfFoundFriend(this.currentUserChatting);
        this.listUSersChattingWith();
      });
  }

  ifMessage(id: string) {
    if(id === this.userId) {
      this.isUserIdSameAsChatRoomMessagesId === true;
    }else {
      this.isUserIdSameAsChatRoomMessagesId === false;
    }
  }

  deleteMessageById(id: any) {
    this.messageService.deleteMessageById(id).subscribe((data) => {
      console.log(data);
      this.getUserChattingWith(this.currentUserChatting);
    });
  }

  // deleteChatRoomByIdForYourself() {
  //   this.userService.deleteUserIdByChatRoomId(this.chatRoomId, this.userId).subscribe((data) => {
  //     console.log(data);
  //   })

  // }

  getChatRoomsByAdminIdAndChatType() {
    this.chatRoomService
      .getChatRoomsByAdminIdAndChatType(this.userId, this.currentUserChatting)
      .subscribe((data) => {
        console.log(data);
        this.chatRoomByAdminIdAndChatTypeList = data;
      });
  }

  addUserToChatRoom(id: string) {
    this.chatRoomService
      .addUserToChatRoom(id, this.currentUserChatting)
      .subscribe((data) => {
        console.log(data);
      });
  }

  deleteChatRoomById() {
    this.userService
      .removeUserIdByChatRoomId(this.chatRoomId, this.userId)
      .subscribe((data) => {
        console.log(data);
        this.listUSersChattingWith();
        this.getAllUsers();
      });

    // this.chatRoomService.deleteChatRoomById(this.chatRoomId).subscribe((data) => {
    //   console.log(data);
    //   this.deleteMessageByChatRoomId(this.chatRoomId);
    //   this.listUSersChattingWith();
    // })
  }

  deleteMessageByChatRoomId(id: any) {
    this.messageService
      .deleteMessageIfChatRoomIsDeleted(id)
      .subscribe((data) => {
      });
  }

  getMessageByChatId(id: any) {
    console.log('Im the chatroomId' + id);

    this.messageService
      .getMessageByChatId(id, this.userId)
      .subscribe((data) => {
        console.log('Im the message data ' + data.text);
        this.chatRoomMessages = data;
        this.messageList = data;
        console.log(this.chatRoomMessages);
      });
  }

  getMessageById(messageId: string) {
    this.messageService.getMessageById(messageId).subscribe((data) => {
      this.messageById = data;
      console.log(this.messageById, ' : itsmeeeee');

      if (this.messageById.userId === this.currentUser.id) {
        this.isUserIdSameAsMessageSenderId = true;
      } else {
        this.isUserIdSameAsMessageSenderId = false;
      }
    });
  }

  getCurrentUserModel() {
    this.userService.getCurrentUserId(this.userId).subscribe((data) => {
      console.log(data);
      this.currentUser = data;
    });
  }

  getChatRoomId(userChattingWithId: any) {
    console.log(userChattingWithId);

    this.chatRoomService
      .getChatRoomId(this.userId, userChattingWithId)
      .subscribe((data) => {
        console.log(data, ' hey');

        this.currentChatRoom = data;
        this.chatRoomId = data.id;
        this.newChatRoomId = data.id;
        console.log(data.id);

        this.getMessageByChatId(this.chatRoomId);
        // this.goToChatRoomPage(this.chatRoomId);
      });
  }

  createChatRoom(newFriendId: any) {
    this.newChatRoom.usersId = [this.userId, newFriendId];

    this.chatRoomService
      .createChatRoom(this.userId, newFriendId, this.newChatRoom)
      .subscribe((data) => {
        console.log(data);
        this.listUSersChattingWith();
        this.getAllUsers();
      });
  }

  onCreationOfChatRoom(id: any) {
    // this.saveIdOfFoundFriend(id);
    this.createChatRoom(id);
    this.listUSersChattingWith();
  }

  getAllUsers() {
    this.userService.getAllUsers(this.userId).subscribe((data) => {
      this.userList = data;
    });
  }

  saveIdOfFoundFriend(id: any) {
    this.userService.getUsersChattingWith(id, this.userId).subscribe((data) => {
      console.log(data);
      this.chattingUserId = id;
      this.getUserChattingWith(id);
      this.goToChatPage();
    });
  }

  listUSersChattingWith() {
    this.userService.listChattingUsers(this.userId).subscribe((data) => {
      console.log(data);
      this.usersChattingWithList = data;
      console.log(this.userChattingWith);
    });
  }

  getUserChattingWith(id: any) {
    console.log(id);
    this.currentUserChatting = id;
    this.userService.getUserChattingWith(id).subscribe((data) => {
      this.userChattingWith = data;

      console.log(this.isFavouriteChat, ': heyyyyy');
      // console.log(this.currentUser.favouriteChatsAndGroups);

      // if(this.currentUser.favouriteChatsAndGroups!.includes(id)) {
      //   this.isFavouriteChat === true;
      // }

      console.log(this.isFavouriteChat, ': heyyyyy');

      this.getChatRoomId(id);
      // this.initializeWebSocketConnection();
    });
  }

  softDeleteAMessage(messageId: string) {
    this.messageService
      .softDeleteAMessage(messageId, this.userId)
      .subscribe((data) => {
        this.getUserChattingWith(this.currentUserChatting);
      });
  }

  updateMessageDialog(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = [id, this.userId]; //
    let dialogRef = this.dialog.open(UpdateMessageComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.getUserChattingWith(this.currentUserChatting);
    });
  }

  onClick(event: any, row: any) {
    row = this.favorite;
    row = !row;
  }

  goToChatPage() {
    this.router.navigate([
      'api/user/main-page/' + this.userId + '/chat-page/' + this.userId,
    ]);
  }

  goToChatRoomPage(id: any) {
    this.router.navigate(['chat-room/' + id], {
      relativeTo: this.activatedRouter,
    });
  }

  goToFavouritesPage() {
    this.router.navigate([
      'api/user/main-page/' + this.userId + '/favourites-page/' + this.userId,
    ]);
  }

  addUserToFavouritePage() {
    this.userService
      .addUserToFavouritePage(this.userId, this.currentUserChatting)
      .subscribe((data) => {
        this.goToFavouritesPage();
      });
  }
}
