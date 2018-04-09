import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

import Chat from '../../models/chat';
import { ChatService } from '../../services/chat.service';

import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  userId: Number = null;
  activeChat: number;
  @Input() chat: Chat;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.currentChatChange.subscribe(chat => {
      this.activeChat = chat.chatId;
    });

    this.userId = jwt_decode(localStorage.getItem('jwt_token')).id;
  }

  checkChat() {
    this.chatService.setChat(this.chat);
  }

  setClasses() {
    const ownMessage = !!this.chat.lastMessage ? this.chat.lastMessage.userId === this.userId : false;
    const activeChat = this.chat.chatId === this.activeChat;
    const unread = !!this.chat.lastMessage
      ? !ownMessage && !activeChat && !this.chat.lastMessage.read
      : false;

    return {
      'unread': unread,
      'active': activeChat
    }
  }

  setLastMessStatus(){
    const ownMessage = !!this.chat.lastMessage ? this.chat.lastMessage.userId === this.userId : false;
    
    const friendUnread = ownMessage && !this.chat.lastMessage.read;

    return {
      friendUnread
    }
  }

}
