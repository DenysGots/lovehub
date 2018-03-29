import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class WebsocketService {
  private socket;

  constructor() { }

  connect(): Rx.Subject<MessageEvent> {
    this.socket = io(`${environment.CHAR_URL}/chat`);

    let observable = new Observable(observer => {
        this.socket.on('resFromServer', (data) => {
          console.log('here');
          observer.next(data);
        });
        
        return () => {
          this.socket.disconnect();
        };
    });

    let observer = {
        next: (data: any) => {
            this.socket.emit(data.event, JSON.stringify(data));
        },
    };

    return Rx.Subject.create(observer, observable);
  }
}