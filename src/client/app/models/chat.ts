export default class Chat {
    chat_id: number;
    user_name: string;
    user_image: string;
    last_message?: string;
  
  
    constructor(chat_id: number, user_name: string, user_image: string, last_message?: string) {
      this.chat_id = chat_id;
      this.user_name = user_name;
      this.user_image = user_image;
      this.last_message = last_message;
    }
  }
  