import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class NotificationsService {
  private serverURL = 'http://localhost:5400';  // TODO: change on server's url change
  private socket = io(`${this.serverURL}`);  // (`${this.serverURL}/notifications`)

  public currentUser = {} as any;

  constructor() {
  }

  sendMessage(receiverUserId) {
    this.socket.emit('send-notification', receiverUserId);
  }

  getMessages() {
    return new Observable(observer => {
      this.socket.on('connect', () => {
        this.socket.emit('user-parameters', this.currentUser);
      });

      this.socket.on('connection-successful', () => {
        console.log('Notifications connected to server via websocket');
      });

      this.socket.on('receive-notification', (data) => {
        observer.next(data);
      });

      this.socket.on('disconnect', () => {
        this.socket.emit('user-disconnected');
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

}
