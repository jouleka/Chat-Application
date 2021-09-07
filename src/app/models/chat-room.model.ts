
export class ChatRoomModel {
  id?: string;

  messagesId?: string[];
  usersId?: string[];
  inactiveUsersId?: string[];
  adminId?: string;
  chatType?: string;
  status?: boolean;
  joinRoomCode?: string;
  chatName?: string;
  mostRecentConversation?: Date;
  favourite?: boolean;
}
