
export class UserModel {
  id?: string;

  name!: string;
  surname!: string;
  fullname!: string;
  username!: string;
  password!: string;
  chatIdList?: string[];
  email!: string;
  usersIdChattingList!: string[];
  leftChatRoomGroups!: string[];
  favouriteChats!: string[];
  favouriteGroups!: string[];
  uniqueTimeofJoiningRoom!: any;
  // phoneNumber?: number;
  status?: boolean;
  recentlyActiveTime?: Date;
  profilePhoto?: string;
  language?: string[];
  interests?: string[];
  favourites?: boolean;
  description?: string;
}
