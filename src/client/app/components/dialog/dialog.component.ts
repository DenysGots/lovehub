import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { ChatService } from '../../services/chat.service';

import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'chat-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  sending = {
    userId: '',
    text: ''
  }

  @Input() messages: Array<object>;

  constructor( private chat: ChatService) {
   }

  ngOnInit() {
    this.sending.userId = jwt_decode(localStorage.getItem('jwt_token')).id;
  }

  sendMes(mes){
    this.chat.sendMessage(this.sending);
    this.sending.text = '';
  }

}
