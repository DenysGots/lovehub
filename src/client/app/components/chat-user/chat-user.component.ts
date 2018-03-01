import { Component, OnInit, Input } from '@angular/core';

import Chat from '../../models/chat';

@Component({
  selector: 'chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.scss']
})
export class ChatUserComponent implements OnInit {
  @Input() chat: Chat;

  constructor() { }

  ngOnInit() {
  }

}
