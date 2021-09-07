import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatRoomModel } from '../models/chat-room.model';
import { MessageModel } from '../models/message.model';
import { UserModel } from '../models/user.model';
import { ChatRoomService } from '../services/chat-room.service';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import * as $ from "jquery"

@Component({
  selector: 'app-find-groups-page',
  templateUrl: './find-groups-page.component.html',
  styleUrls: ['./find-groups-page.component.scss']
})
export class FindGroupsPageComponent implements OnInit {

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
  favorite: boolean = false;
  chatRoomAfterClick: ChatRoomModel = new ChatRoomModel();
  openedChat: boolean = false;
  openedParticipantsPage: boolean = false;
  participantsList!: any[];
  chatRoomId!: any;
  currentUser: UserModel = new UserModel();
  chatRoomMessages: any [] = [];
  userByChatRoomId: UserModel = new UserModel();

  constructor(private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private chatRoomService: ChatRoomService,
    private dialog: MatDialog) { }


  ngOnInit(): void {
    this.userId = this.activatedRouter.snapshot.paramMap.get('id');
    this.getPublicGroups();
    this.getAllUsers();
    this.getCurrentUserModel();
  }

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame: any) {
      that.stompClient.subscribe("/chat", (message: any) => {
        if(message.body) {
          $(".chat").append("<div class='message'>"+message.body+"</div>")
          console.log(message.body);
        }
      });
    });
  }

  sendMessage(message: any){
    this.stompClient.send("/app/send/message" , {}, message);
    $('#input').val('');
  }

  getAllUsers() {
    this.userService.getAllUsers(this.userId).subscribe((data) => {
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

  getPublicGroups() {
    this.chatRoomService.getPublicGroups(this.userId).subscribe((data) => {
      this.groupChatRoomList = data
    })
  }

  getMessageByChatId(id: any) {
    this.messageService.getMessageByChatId(id, this.userId).subscribe((data) => {
      console.log(data.text);
      this.chatRoomMessages = data;
    })
  }

  getChatRoomAfterClick(id: string) {
    this.chatRoomService.getChatRoomAfterClick(id).subscribe((data) => {
      console.log(data);
      this.chatRoomAfterClick = data;
      console.log(this.chatRoomAfterClick, " hwhewqe");

      this.chatRoomId = data.id;
      this.getParticipantsByChatRoomGroupId(id);
      this.getMessageByChatId(id);
      this.getUserByChatRoomAdminId();
    })
  }

  getParticipantsByChatRoomGroupId(id: string) {
    this.userService.getUsersByChatRoomGroupId(id).subscribe((data) => {
      console.log(data);
      this.participantsList = data;
      console.log(this.participantsList);
    })
  }

  joinPublicChatRoom() {
    this.chatRoomService.joinPublicChatRoom(this.chatRoomId, this.userId).subscribe((data) => {
      this.goToGroupsPage();
    })
  }

  onCreationOfChatRoom(id: string) {

  }

  onClick(event: any, row: any) {
    row = this.favorite;
    row = !row;
  }

  goToGroupsPage() {
    this.router.navigate(['api/user/main-page/' + this.userId + "/groups-page/" + this.userId]);
  }

}
