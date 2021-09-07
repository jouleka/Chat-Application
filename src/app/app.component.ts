import { CommunicationService } from './services/communication.service';
import { Component, OnInit } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import * as $ from "jquery"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  private serverUrl = 'http://localhost:8080/socket'
  private newTitle: string = 'WebSockets chat';
  private stompClient: any;
  title = 'ChatApplication';
  loginStatus: boolean = false;

  constructor(private communicationService: CommunicationService) {}

  ngOnInit(){
    this.updateLoginStatus();
    // this.initializeWebSocketConnection();
  }

  // initializeWebSocketConnection(){
  //   let ws = new SockJS(this.serverUrl);
  //   this.stompClient = Stomp.over(ws);
  //   let that = this;
  //   this.stompClient.connect({}, function(frame: any) {
  //     that.stompClient.subscribe("/chat", (message: any) => {
  //       if(message.body) {
  //         $(".chat").append("<div class='message'>"+message.body+"</div>")
  //         console.log(message.body);
  //       }
  //     });
  //   });
  // }

  // sendMessage(message: any){
  //   this.stompClient.send("/app/send/message" , {}, message);
  //   $('#input').val('');
  // }


  updateLoginStatus() {
    this.communicationService.getMessage().subscribe(message => {
      if(message) {
        this.loginStatus = true;
        console.log(this.loginStatus);

      }
    })
  }
}
