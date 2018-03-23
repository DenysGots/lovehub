import { UserProfile } from './user-profile';

export default class Chat {
    constructor(private chatId: number,private user: UserProfile) {
      this.chatId = chatId;
      this.user = user;
    }
  }
  