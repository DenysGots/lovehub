import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

interface Results {
  interests: string[];
  hints: string[];
}

@Injectable()
export class InterestsService {
  private serverURL = 'http://localhost:5400';  // TODO: change on server's url change
  private socket = io(`${this.serverURL}/interests`);

  public currentUserId;
  public results = {} as Results;

  constructor() {
  }

  getInterests() {
    this.socket.emit('get-user-interests');
  }

  getHints(userInput) {
    this.socket.emit('send-user-input', userInput);
  }

  saveChanges(interests) {
    this.socket.emit('change-user-interests', interests);
  }

  getData() {
    return new Observable(observer => {
      this.socket.on('connect', () => {
        this.socket.emit('user-id', this.currentUserId);
      });

      this.socket.on('connection-successful', () => {
        console.log('Interests connected to server via websocket');
      });

      this.socket.on('receive-interests', (data) => {
        this.results.interests = data;

        observer.next(this.results);
      });

      this.socket.on('receive-hints', (data) => {
        this.results.hints = data;

        observer.next(this.results);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

}
