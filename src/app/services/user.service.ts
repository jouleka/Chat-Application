import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

const baseUrl = 'http://localhost:8080/api/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) {}

  createUserProfile(data: any): Observable<any> {
    return this.http.post(baseUrl + '/register', data, { responseType: 'text' });
  }

  loginUserProfile(data: any): Observable<any> {
    return this.http.post(baseUrl + '/login', data, { responseType: 'text' });
  }

  logoutUserProfile(id: String, data: any): Observable<Object> {
    return this.http.put(`${baseUrl}/logout/${id}`, data);
  }

  logedInUser(id: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/logged-user/' + id);
  }

  editUser(id: String, date: any): Observable<Object> {
    return this.http.put(`${baseUrl}/edit/${id}`, date);
  }

  getAllUsers(id: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/list-all/' + id);
  }

  getUsersChattingWith(id: string, currentUserId: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/list-chatting-users/' + id + "/current-user/" + currentUserId);
  }

  listChattingUsers(id: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/list-chatting-users/' + id);
  }

  getUserChattingWith(id: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/get-chatting-user/' + id);
  }

  getCurrentUserId(id: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/get-current-user/' + id);
  }

  removeUserIdByChatRoomId(roomId: string, currentUserId: string): Observable<any> {
    return this.http.delete<any>(`${baseUrl}/deleteUserById/roomId/${roomId}/currentUserId/${currentUserId}`);
  }

  getUsersByChatRoomGroupId(id: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/getUsersByChatRoomGroupId/' + id);
  }

  getUserByChatRoomAdminId(roomId: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/getUserByChatRoomAdminId/' + roomId);
  }

  leaveChatRoomGroup(roomId: string, currentUserId: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/leaveChatGroup/roomId/' + roomId + "/currentUserId/" + currentUserId);
  }

  listAllUsersOnGroupsPage(id:string): Observable<any> {
    return this.http.get<any>(baseUrl + '/list-all-users/' + id);
  }

  addUserToFavouritePage(currentUserId: string, friendId: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/addToFavourite/currentUser/' + currentUserId + "/friendId/" + friendId);
  }

  addUserToFavouriteGroups(currentUserId: string, friendId: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/addGroupToFavourite/currentUser/' + currentUserId + "/friend/" + friendId);
  }

  getFavouriteGroups(userId: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/getFavouriteGroups/' + userId);
  }

  getFavouriteChats(userId: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/getFavouriteChats/' + userId);
  }

  removeUserFromFavouritesGroups(userId: string, friendId: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/removeUserFromFavouriteGroups/user/' + userId + "/friend/" + friendId);
  }

  removeUserFromFavouritesPage(userId: string, friendId: string): Observable<any> {
    return this.http.get<any>(baseUrl + '/removeUserFromFavouriteChats/user/' + userId + "/friend/" + friendId);
  }

}
