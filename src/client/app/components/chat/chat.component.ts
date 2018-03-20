import { Component, OnInit } from '@angular/core';
import Chat from '../../models/chat';
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
  messages = [];

  constructor(
    private windowService: WindowService,
    private chat: ChatService,
    private http: HttpClient
  ) {
    this.height = this.windowService.freeHeight;
   }

  onChatChecked(chat){
    this.chat.setChat(chat);
    this.http.get<Chat>(`api/messages?chatId=${chat}`).subscribe((data) => {
      this.messages = data.messages;
    });
  }

  ngOnInit() {
    this.http.get<any[]>(`api/messages`).subscribe((data) => {
      this.chats = data;
    });

    this.chat.socket.subscribe(msg => {
      console.log('msg', msg);
      this.messages = [...this.messages, msg];
      console.log("sss", this.messages);
    });
  }
}
