import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { NotificationsService } from '../../services/notifications.service';

interface Message {
  user: string;
  isHidden: boolean;
  isShifted: boolean;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: [
    './notifications.component.scss'
  ]
})
export class NotificationsComponent implements OnInit, OnDestroy {
  messages = [];
  connection;
  notificationsList = {
    isHidden: true,
    minHeight: '0'
  };

  constructor(private notificationsService: NotificationsService) {
  }

  ngOnInit() {
    this.connection = this.notificationsService.getMessages().subscribe(message => {
      this.handleMessages(message);
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  sendLike(message): void {
    this.notificationsService.sendMessage(message);
  }

  closeNotificationsList(): void {
    this.messages = [];
    this.notificationsList.isHidden = true;
  }

  handleMessages(message): void {
    const messages = this.messages;

    let currentMessage = {} as Message;

    const randomSequence = (Math.round(Math.random() * 1000000)).toString();      // TODO: delete

    messages.push(<Message>{
      user: randomSequence,     // TODO: change "rand" to "message"
      isHidden: true,
      isShifted: true
    });

    for (let i = 0; i < messages.length; i += 1) {
      if (messages[i]['user'] === randomSequence) {
        currentMessage = messages[i];
        break;
      }
    }

    // if (this.notificationsList.isHidden) {
    //   setTimeout(() => {
    //     this.notificationsList.isHidden = false;
    //   }, 0);
    // }

    if (this.notificationsList.isHidden) {
      this.notificationsList.isHidden = false;
    }

    setTimeout(() => {
      currentMessage.isHidden = false;
    }, 500);

    setTimeout(() => {
      currentMessage.isShifted = false;
    }, 1000);

    setTimeout(() => {
      currentMessage.isShifted = true;
    }, 3500);

    setTimeout(() => {
      currentMessage.isHidden = true;
    }, 4000);

    setTimeout(() => {
      messages.splice(messages.indexOf(currentMessage), 1);

      if (messages.length === 0) {
        this.notificationsList.isHidden = true;
      }
    }, 4500);
  }

}
