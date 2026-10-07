import { appendChatMessage } from '../../message-rendering';
import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import $ from 'jquery';
import { MatGridTileText, MatGridTileHeaderCssMatStyler, MatGridTileFooterCssMatStyler } from '@angular/material/grid-list';
import { NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.scss'],
    imports: [MatGridTileText, MatGridTileHeaderCssMatStyler, NgIf, FormsModule, MatIcon, NgClass, MatGridTileFooterCssMatStyler, MatButton]
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
          appendChatMessage(message.body)
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
