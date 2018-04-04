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
    this.chatService.currentChatIdChange.subscribe(id => {
      this.activeChat = id;
    });

    this.userId = jwt_decode(localStorage.getItem('jwt_token')).id;
  }

  checkChat(chatId) {
    this.chatService.setChat(chatId);
  }

}
