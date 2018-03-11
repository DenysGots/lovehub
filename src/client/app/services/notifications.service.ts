import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as io from 'socket.io-client';

@Injectable()
export class NotificationsService {
  private serverURL = '';
  private socket = io(this.serverURL);

  constructor() {
    this.socket.on('receive-notification', (data) => {
      console.log(data);
    });

    this.socket.on('WORKING', (data) => {
      console.log(data);
    });
  }

  sendMessage(message) {
    this.socket.emit('send-notification', message);
    console.log(this.socket);
  }

  getMessages() {
    const observable = new Observable(observer => {
      this.socket.on('receive-notification', (data) => {
        console.log(data);

        observer.next(data);
      });

      this.socket.on('WORKING', (data) => {
        console.log(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });

    return observable;
  }

}
