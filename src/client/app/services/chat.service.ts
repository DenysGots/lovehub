import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

import Message from '../models/message';
import Chat from '../models/chat';

import { NotificationService } from './notification.service';
import { AuthService } from './auth.service';

@Injectable()
export class ChatService {
  currentChat: Chat = null;
  userId: Number = null;
  messages: Message[] = null;
  chats = [];

  currentChatChange: Subject<Chat> = new Subject<Chat>();
  messagesUpdate: Subject<Message[]> = new Subject<Message[]>();
  userlistUpdate: Subject<Chat[]> = new Subject<Chat[]>();
  showDialogsUpdate: Subject<boolean> = new Subject<boolean>();

  constructor(
    private notifService: NotificationService,
    private wsService: WebsocketService,
    private http: HttpClient,
    private authService: AuthService) {

    wsService.connect('newMessage').subscribe(data => {
      this.messages = [...this.messages, data.message];
      this.messagesUpdate.next(this.messages);

      const updateChat = this.chats.find(chat => chat.chatId === data.chatId);
      updateChat.lastMessage = data.message;
    });

    this.currentChatChange.subscribe((chat: Chat) => {
        this.currentChat = chat;

        if(!!this.currentChat.lastMessage){
          this.currentChat.lastMessage.read = true;
        }
    });

    this.userId = this.authService.getLoggedInUserCredential().userId;

    this.notifService.getNotifications().subscribe((notification: any) => {
      const { chatId, message } = notification.message;
      const updateChat = this.chats.find(chat => chat.chatId === chatId);
      updateChat.lastMessage = message;

      this.userlistUpdate.next(this.chats);
    });

    this.notifService.setRead().subscribe((chatId: Number) => {
      if(!!this.messages){
        this.messages
        .filter(mes => mes.read === false)
        .map(mes => mes.read = true);
      }

      const updateChat = this.chats.find(chat => chat.chatId === chatId);
        if(!!updateChat.lastMessage && updateChat.lastMessage.userId === this.userId){
          updateChat.lastMessage.read = true;
          this.userlistUpdate.next(this.chats);
        }
    });

    this.http.get<Chat[]>(`api/chats/${this.userId}`).subscribe((data) => {
      this.chats = data;
      this.userlistUpdate.next(this.chats);
    });
  }

  sendMessage(message){
    if(this.currentChat) {
      this.wsService.send('send', {chat: this.currentChat, message});
    }
  }

  setActiveChat(chat: Chat){
    const prevChatId = !!this.currentChat ? this.currentChat.chatId : null;

    this.wsService.send('changeRoom', {prevChatId, chat});

    this.currentChatChange.next(chat);
    this.showDialogsUpdate.next(true);

    this.http.get<Array<Message>>(`api/messages/${chat.chatId}`).subscribe((data) => {
      this.messages = data;
      this.messagesUpdate.next(this.messages);
    });
  }

  closeMessages(){
    this.showDialogsUpdate.next(false);
  }
}