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
  messages: Array<any> = null;

  @ViewChild('scrollChat') private scrollChat: ElementRef;

  constructor( private chat: ChatService) {}

  ngOnInit() {
    this.chat.messagesUpdate.subscribe(data => {
      this.messages = data;
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
    } catch(err) { }                 
  }

  sendMes(mes){
    const newMessage = {
        userId: this.userId,
        text: this.text
    };

    this.chat.sendMessage(newMessage);
    this.text = '';
  }

  setClasses(mess) {
    const ownMessage = mess.userId === this.userId;
    
    return {
      'justify-content-end': ownMessage,
      'justify-content-start': !ownMessage,
      'unread': ownMessage && !mess.read
    }
  }
}
