export default class Chat {
    chat_id: number;
    user_name: string;
    user_image: string;
    last_message?: string;
    messages?: Array<object>;
  
  
    constructor(chat_id: number, user_name: string, user_image: string,
      last_message?: string, messages?: Array<object>) {
      this.chat_id = chat_id;
      this.user_name = user_name;
      this.user_image = user_image;
      this.last_message = last_message;
      this.messages = messages;
    }
  }
  