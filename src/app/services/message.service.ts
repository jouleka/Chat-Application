import { MessageModel } from './../models/message.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/message';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  constructor(private http: HttpClient) {}

  postMessage(id: any ,data: any): Observable<any> {
    return this.http.post(baseUrl + '/currentUserId/' + id + "/post-message", data, { responseType: 'text' });
  }

  getMessageByChatId(id: string, currentUserId: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/listByChatId/' + id + "/currentUserId/" + currentUserId);
  }

  deleteMessageById(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/delete-message/${id}`);
  }

  deleteMessageIfChatRoomIsDeleted(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/delete-messageByChatRoom/${id}`);
  }

  softDeleteAMessage(messageId: string, userId: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/softDeleteMessage/' + messageId + "/userId/" + userId);
  }

  updateMessage(messageId: string, userId: string, message: MessageModel): Observable<any> {
    return this.http.put<any>(baseUrl + '/updateMessage/' + messageId + "/userId/" + userId, message);
  }

  getMessageById(messageId: string): Observable<any> {
    return this.http.get<any>(`${baseUrl}/get-messageById/${messageId}`);
  }
}
