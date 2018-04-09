import { Component, OnInit } from '@angular/core';
import Message from '../../models/message';
import { WindowService } from '../../services/window.service';
import { ChatService } from '../../services/chat.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  height = 100;
  chats = [];

  constructor(
    private windowService: WindowService,
    private chatService: ChatService,
    private http: HttpClient
  ) {
    this.height = this.windowService.freeHeight;
   }


  ngOnInit() {

    this.chatService.userlistUpdate.subscribe(data => {
      this.chats = data;
      // if(data.type === 'setRead'){
      //   console.log('d',data)
      //   const updateChat = this.chats.find(chat => chat.chatId === data.data.chatId);
      //   if(!!updateChat.lastMessage){
      //     updateChat.lastMessage.read = true;
      //   }
        
      // } else {
      //   console.log('dd', data)
      //   const updateChat = this.chats.find(chat => chat.chatId === data.data.chatId);
      //   updateChat.lastMessage = data.data.message;
      // }
    });
  }
}
