import { Component, OnInit, Input, Output, ViewChild, ElementRef, HostListener } from '@angular/core';
import { EventEmitter } from 'events';
import { ChatService } from '../../services/chat.service';

import * as jwt_decode from 'jwt-decode';
import Chat from '../../models/chat';

@Component({
  selector: 'chat-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  userId: Number = null;
  text: String = '';
  windowWidth: number = window.innerWidth;
  messages: Array<any> = null;

  @Input() chat: Chat;

  @ViewChild('scrollChat') private scrollChat: ElementRef;

  constructor( private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.messagesUpdate.subscribe(data => {
      this.messages = data;
    });

    console.log('ca', this.chat);

    this.userId = jwt_decode(localStorage.getItem('jwt_token')).id;

    this.scrollToBottom();
  }

  ngAfterViewInit() {
    this.windowWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  resize(event) {
      this.windowWidth = window.innerWidth;
  }

  goBack(){
    this.chatService.goBack();
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

    this.chatService.sendMessage(newMessage);
    this.text = '';
  }

  setClasses(mes) {
    const ownMessage = mes.userId === this.userId;
    
    return {
      'justify-content-end': ownMessage,
      'justify-content-start': !ownMessage
    }
  }

  setMesClasses(mes){
    const ownMessage = mes.userId === this.userId;
    
    return {
      'right': mes.userId === this.userId,
      'left': mes.userId !== this.userId,
      'unread': ownMessage && !mes.read
    }
  }
}
