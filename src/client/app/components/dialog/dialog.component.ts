import { Component, OnInit, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { EventEmitter } from 'events';
import { ChatService } from '../../services/chat.service';

import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'chat-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  userId: Number = null;
  text: String = '';
  chatId: Number = null;
  selectedMessage = null;
  messages: Array<object> = null;

  @ViewChild('scrollChat') private scrollChat: ElementRef;

  constructor( private chat: ChatService) {}

  ngOnInit() {
    this.chat.currentChatIdChange.subscribe(id => {
      this.chatId = id;
    });

    this.chat.messagesUpdate.subscribe(data => {
      if (!!data.new){
        this.messages = data.data;
      } else{
        this.messages = [...this.messages, data.data];
      }
    });

    this.userId = jwt_decode(localStorage.getItem('jwt_token')).id;

    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
        this.scrollChat.nativeElement.scrollTop = this.scrollChat.nativeElement.scrollHeight;
    } catch (err) { }
  }

  sendMes(mes){
    const newMessage = {
      chat: {
        chatId: this.chatId,
        toUser: this.chat.getFriend(this.chatId, this.userId)
      },
      message: {
        userId: this.userId,
        text: this.text
      }
    };

    this.chat.sendMessage(newMessage);
    this.text = '';
  }

  onSelect(msg): void {
    if (msg.userId !== this.userId) {
      return;
    }

    if (this.selectedMessage === msg) {
      this.selectedMessage = null;
      return;
    }

    this.selectedMessage = msg;
    console.log(this.selectedMessage === msg);
  }

}
