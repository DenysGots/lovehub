import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChatService {
  currentChatId: number;
  chats = [];
  currentChatIdChange: Subject<number> = new Subject<number>();
  socket: Subject<any>;
  
  constructor(private wsService: WebsocketService, private http: HttpClient) {
    this.socket = <Subject<any>>wsService
      .connect()
      .map((response: any): any => {
        return response;
      });

    this.currentChatIdChange.subscribe((value) => {
        this.currentChatId = value;
    });
  }

  setChats(chats){
    this.chats = chats;
  }

  getFriend(chatId, userId){
    return this.chats.find(chat => chat.chatId === chatId).user.userId || -1;
  }

  sendMessage(data){
    if(this.currentChatId) {
      this.socket.next({event: 'send', data});
    }
  }

  setChat(chatId: number){
    this.socket.next({event: 'changeRoom', prevChatId: this.currentChatId, chatId});
    this.currentChatIdChange.next(chatId);
  }
}