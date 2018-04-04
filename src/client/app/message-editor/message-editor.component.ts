import {Component, Input, OnInit} from '@angular/core';
import { ChatService} from '../services/chat.service';

@Component({
  selector: 'app-message-editor',
  templateUrl: './message-editor.component.html',
  styleUrls: ['./message-editor.component.scss']
})
export class MessageEditorComponent implements OnInit {

  @Input() message;
  @Input() chatId;

  constructor(private readonly chat: ChatService) { }

  ngOnInit() {
  }

  onDelete(chatId: number, msgId: string): void {
    this.chat.deleteMessage(chatId, msgId);
  }

  onEdit(): void {

  }

}
