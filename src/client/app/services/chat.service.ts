import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

import Message from '../models/message';
import { NotificationService } from './notification.service';

@Injectable()
export class ChatService {
  currentChatId: number;
  chats = [];

  currentChatIdChange: Subject<number> = new Subject<number>();
  messagesUpdate: Subject<any> = new Subject<any>();
  socket: Subject<any>;
  
  constructor(
    private notifService: NotificationService,
    private wsService: WebsocketService,
    private http: HttpClient) {
    this.socket = <Subject<any>>wsService
      .connect()
      .map((response: any): any => {
        return response;
      });

    this.currentChatIdChange.subscribe((value) => {
        this.currentChatId = value;
    });

    this.notifService.getNotifications().subscribe((data: any) => {

      this.chats = this.chats.map(chat => {
        if(chat.chatId === data.data.chatId){
          chat.lastMessage = data.data.message;
          this.socket.next({
            event: 'changeRoom',
            data:{prevChatId: this.currentChatId, chatId: chat.chatId}
            });
        }

        return chat;
      });
    });

    this.socket.subscribe(data => {
      if(data.event==='myMes' || data.event === 'newMes'){
        this.messagesUpdate.next({data: data.data.message});
      }
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
    this.socket.next({event: 'changeRoom', data: {prevChatId: this.currentChatId, chatId}});
    this.currentChatIdChange.next(chatId);

    this.http.get<Array<Message>>(`api/messages/${chatId}`).subscribe((data) => {
      this.messagesUpdate.next({new: true, data});
    });
  }
}