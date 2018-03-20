import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

import Chat from '../../models/chat';

@Component({
  selector: 'chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.scss']
})
export class ChatUserComponent implements OnInit {
  @Input() chat: Chat;
  @Output() onChatChecked = new EventEmitter<Array<object>>();

  constructor() { }

  ngOnInit() { }

  checkChat(messages) {
    this.onChatChecked.emit(messages);
  }

}
