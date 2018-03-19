import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class ChatService {
  
  messages: Subject<any>;
  
  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService
      .connect()
      .map((response: any): any => {
        return response;
      });
   }
  
  // Our simplified interface for sending
  // messages back to our socket.io server
  getDefaultData() {
    this.messages.next({event: 'getDefault', data: {}});
  }

  sendMessage(data){
    this.messages.next({event: 'send', data});
  }

}