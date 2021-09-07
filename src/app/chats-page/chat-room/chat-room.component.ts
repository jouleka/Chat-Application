import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import * as $ from "jquery"

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

  @Input() userChattingWith: UserModel = new UserModel();
  @Input() openedChat: boolean = false;
  term!: string;
  private serverUrl = 'http://localhost:8080/socket'
  private newTitle: string = 'WebSockets chat';
  private stompClient: any;

  constructor() { }

  ngOnInit(): void {
    this.initializeWebSocketConnection();
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

}
