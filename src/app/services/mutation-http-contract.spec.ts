import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { ChatRoomService } from './chat-room.service';
import { MessageService } from './message.service';
import { UserService } from './user.service';

describe('chat action HTTP contracts', () => {
  let rooms: ChatRoomService;
  let messages: MessageService;
  let users: UserService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    rooms = TestBed.inject(ChatRoomService);
    messages = TestBed.inject(MessageService);
    users = TestBed.inject(UserService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  const mutations: { name: string; path: string; invoke: () => Observable<unknown> }[] = [
    { name: 'add a participant', path: 'chat-room/addUserToChatRoom/roomId/room/userChattingWithId/friend', invoke: () => rooms.addUserToChatRoom('room', 'friend') },
    { name: 'remove a participant', path: 'chat-room/removeUser/roomId/room/currentUserId/user/participantId/friend', invoke: () => rooms.removeUserFromChatRoom('room', 'user', 'friend') },
    { name: 'join a public group', path: 'chat-room/joinPublicChatRoom/roomId/room/userId/user', invoke: () => rooms.joinPublicChatRoom('room', 'user') },
    { name: 'soft delete a message', path: 'message/softDeleteMessage/message/userId/user', invoke: () => messages.softDeleteAMessage('message', 'user') },
    { name: 'activate a conversation', path: 'user/list-chatting-users/friend/current-user/user', invoke: () => users.getUsersChattingWith('friend', 'user') },
    { name: 'leave a group', path: 'user/leaveChatGroup/roomId/room/currentUserId/user', invoke: () => users.leaveChatRoomGroup('room', 'user') },
    { name: 'favourite a chat', path: 'user/addToFavourite/currentUser/user/friendId/friend', invoke: () => users.addUserToFavouritePage('user', 'friend') },
    { name: 'favourite a group', path: 'user/addGroupToFavourite/currentUser/user/friend/room', invoke: () => users.addUserToFavouriteGroups('user', 'room') },
    { name: 'remove a favourite group', path: 'user/removeUserFromFavouriteGroups/user/user/friend/room', invoke: () => users.removeUserFromFavouritesGroups('user', 'room') },
    { name: 'remove a favourite chat', path: 'user/removeUserFromFavouriteChats/user/user/friend/friend', invoke: () => users.removeUserFromFavouritesPage('user', 'friend') },
  ];

  for (const mutation of mutations) {
    it(`uses a JSON POST to ${mutation.name}`, () => {
      let completed = false;
      mutation.invoke().subscribe({ complete: () => { completed = true; } });
      const request = http.expectOne(`http://localhost:8080/api/${mutation.path}`);
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual({});
      expect(request.request.detectContentTypeHeader()).toBe('application/json');
      request.flush(null, { status: 204, statusText: 'No Content' });
      expect(completed).toBe(true);
    });
  }

  it('keeps message and favourite lists as GET reads', () => {
    messages.getMessageByChatId('room', 'user').subscribe();
    users.getFavouriteGroups('user').subscribe();
    users.getFavouriteChats('user').subscribe();

    for (const path of [
      'message/listByChatId/room/currentUserId/user',
      'user/getFavouriteGroups/user',
      'user/getFavouriteChats/user',
    ]) {
      const request = http.expectOne(`http://localhost:8080/api/${path}`);
      expect(request.request.method).toBe('GET');
      request.flush([]);
    }
  });
});
