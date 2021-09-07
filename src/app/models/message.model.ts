
export class MessageModel {
  id?: string;

  usernameOfSender?: string;
  userId?: string;
  text?: string;
  chatId?: string;
  usersSoftDeletingMessages!: string[];
  softDeleted!: boolean;
  timeOfSendingMessage?: Date;
  seenUserIdList?: string[];
}
