export default class Chat {
    chatId: number;
    username: string;
    avatar: string;
    lastMessage?: string;
    messages?: Array<object>;
  
  
    constructor(chatId: number, username: string, avatar: string,
      lastMessage?: string, messages?: Array<object>) {
      this.chatId = chatId;
      this.username = username;
      this.avatar = avatar;
      this.lastMessage = lastMessage;
      this.messages = messages;
    }
  }
  