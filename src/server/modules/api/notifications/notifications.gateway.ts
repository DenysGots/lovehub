import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketServer
} from '@nestjs/websockets';

import { NotificationsServiceComponent } from './notifications.service';

@WebSocketGateway()  // { namespace: 'notifications' }
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;

  constructor(private readonly notificationsService: NotificationsServiceComponent) {
  }

  handleConnection(client: any) {
    console.log(`User ${client.id} connected via websocket`);
    client.emit('connection-successful');
  }

  handleDisconnect(client: any) {
    console.log(`User ${client.id} disconnected`);
    this.notificationsService.removeUser(client);
  }

  // Received data must contain user properties:
  // user id, first name and message type: 'like', new mail, chat message, etc.
  @SubscribeMessage('user-parameters')
  onConnect(client: any, connectedUserParameters) {
    this.notificationsService.addUser(client, connectedUserParameters);
  }

  @SubscribeMessage('user-disconnected')
  onDisconect(client: any) {
    console.log(`User ${client.id} disconnected`);
    this.notificationsService.removeUser(client);
  }

  // Received data must contain link to user-receiver profile (user id)
  // Sent data must contain sender name and message type: 'like', new mail, chat message, etc.
  @SubscribeMessage('send-notification')
  onNotification(client: any, receiverUserId) {
    const notificationReceiver = this.notificationsService.handleNotification(client, receiverUserId);

    if (notificationReceiver.receiverClientId) {
      this.server.sockets
        .to(notificationReceiver.receiverClientId)
        .emit('receive-notification', notificationReceiver.senderUserName);
    }
  }

}
