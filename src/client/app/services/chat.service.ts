import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

import Message from '../models/message';
import { NotificationService } from './notification.service';

import * as jwt_decode from 'jwt-decode';

@Injectable()
export class ChatService {
  currentChat: any = null;
  userId: Number = null;
  messages: Array<any> = null;
  chats = [];

  currentChatChange: Subject<any> = new Subject<any>();
  messagesUpdate: Subject<any> = new Subject<any>();
  userlistUpdate: Subject<any> = new Subject<any>();
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

    this.currentChatChange.subscribe((value) => {
        this.currentChat = value;
        if(!!this.currentChat.lastMessage){
          this.currentChat.lastMessage.read = true;
        }
    });

    this.userId = jwt_decode(localStorage.getItem('jwt_token')).id;

    this.notifService.getNotifications().subscribe((data: any) => {
      console.log('getNotifications',data);
      const updateChat = this.chats.find(chat => chat.chatId === data.data.chatId);
        updateChat.lastMessage = data.data.message;

        this.userlistUpdate.next(this.chats);
    });

    this.notifService.setRead().subscribe((data: any) => {
      if(!!this.messages){
        this.messages
        .filter(mes => mes.read === false)
        .map(mes => mes.read = true);
      
       this.messagesUpdate.next( this.messages);
      }
      const updateChat = this.chats.find(chat => chat.chatId === data.data.chatId);
        if(!!updateChat.lastMessage && updateChat.lastMessage.userId === this.userId){
          updateChat.lastMessage.read = true;
          this.userlistUpdate.next(this.chats);
        }
      
    });

    this.socket.subscribe(data => {
      if(data.event === 'newMessage'){
        this.messages = [...this.messages, data.data.message];
        this.messagesUpdate.next(this.messages);

        const updateChat = this.chats.find(chat => chat.chatId === data.data.chatId);
        updateChat.lastMessage = data.data.message;

        this.userlistUpdate.next(this.chats);
      }
    });

    this.http.get<any>(`api/chats/${this.userId}`).subscribe((data) => {
      this.chats = data;
      this.userlistUpdate.next(this.chats);
    });
  }

  sendMessage(message){
    if(this.currentChat) {
      this.socket.next({event: 'send', data:{chat: this.currentChat, message}});
    }
  }

  setChat(chat: any){
    const prevChatId = !!this.currentChat ? this.currentChat.chatId : null;

    this.socket.next({event: 'changeRoom', data: {prevChatId, chat}});
    this.currentChatChange.next(chat);

    this.http.get<Array<Message>>(`api/messages/${chat.chatId}`).subscribe((data) => {
      this.messages = data;
      this.messagesUpdate.next(this.messages);
    });
  }
}