import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'chat-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  user = {
    message: '',
    name: 'Ivan Ivanov'
  }

  @Input() messages: Array<object>;

  constructor( private chat: ChatService) { }

  ngOnInit() {
    this.messages = this.messages.map(mes => ({...mes, me: mes['user'] === this.user.name}))
  }

  sendMes(mes){
    this.chat.sendMessage(this.user);
  }

}
