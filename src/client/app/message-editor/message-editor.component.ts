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

  text = '';
  isEditable = false;

  constructor(private readonly chat: ChatService) { }

  ngOnInit() {
    this.text = this.message.text;
  }

  onDelete(chatId: number, msgId: string): void {
    console.log(`im here onDelete ${chatId}: ${msgId}`);
    this.chat.deleteMessage(chatId, msgId);
  }

  toggle(): void {
    this.isEditable = !this.isEditable;
  }

  onEdit(chatId: number, msgId: number, text: string): void {
    console.log('im here onChange');
    this.chat.editMessage(chatId, msgId, text);
  }

}
