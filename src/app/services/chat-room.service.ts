import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatRoomModel } from '../models/chat-room.model';

const baseUrl = 'http://localhost:8080/api/chat-room';

@Injectable({
  providedIn: 'root'
})

export class ChatRoomService {

  constructor(private http: HttpClient) {}

  createChatRoom(currentUserId: string, newFriendChattingWithId: string, data: any): Observable<any> {
    return this.http.post(baseUrl + '/currentUserId/' + currentUserId + "/newFriendChattingWithId/" + newFriendChattingWithId + "/create", data , { responseType: 'text' });
  }

  createGroupChatRoom(id: string, data: any): Observable<any> {
    return this.http.post(baseUrl + '/currentUserId/' + id + "/createChatRoomGroup", data, { responseType: 'text' });
  }

  getChatRoomId(currentUserId: string, userChattingWithId: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/' + currentUserId + "/" + userChattingWithId);
  }

  deleteChatRoomById(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/deleteById/${id}`);
  }

  getChatRoomGroups(id: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/listChatRoomGroups/' + id);
  }

  getInactiveChatRoomGroups(id: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/listInactiveChatRoomGroups/' + id);
  }

  getChatRoomAfterClick(id: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/getChatRoomAfterClick/' + id);
  }

  getChatRoomsByAdminIdAndChatType(id: string, userChattingWithId: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/getChatRoomsByAdminIdAndChatType/' + id + "/userChattingWithId/" + userChattingWithId);
  }

  addUserToChatRoom(roomId: string, userChattingWithId: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/addUserToChatRoom/roomId/' + roomId + "/userChattingWithId/" + userChattingWithId);
  }

  removeUserFromChatRoom(roomId: string, currentUserId: string, participantId: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/removeUser/roomId/' + roomId + "/currentUserId/" + currentUserId + "/participantId/" + participantId);
  }

  getPublicGroups(id: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/listPublicGroups/' + id);
  }

  joinPublicChatRoom(roomId: string, userId: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/joinPublicChatRoom/roomId/' + roomId + "/userId/" + userId);
  }

  deleteChatRoomGroup(roomId: string): Observable<any> {
    return this.http.delete(`${baseUrl}/deleteChatGroupRoom/${roomId}`);
  }

  updateChatRoomGroup(roomId: string, chatRoomModel: ChatRoomModel): Observable<any> {
    return this.http.put(`${baseUrl}/updateChatRoom/${roomId}`, chatRoomModel);
  }
}
