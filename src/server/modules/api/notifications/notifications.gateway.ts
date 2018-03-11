import { WebSocketGateway, OnGatewayConnection, SubscribeMessage, WsResponse, WebSocketServer, WsException } from '@nestjs/websockets';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import { NotificationsServiceComponent } from './notifications.service';

@WebSocketGateway()
export class NotificationsGateway implements OnGatewayConnection {
  @WebSocketServer() server;

  @SubscribeMessage('send-notification')
  onEvent(client, data) {
    console.log(client, data);
    this.server.sockets.emit('receive-notification', 'success');
  }

  handleConnection(client: any) {
    console.log(client);
    client.emit('WORKING', 'working');
  }

  constructor(private readonly notificationsService: NotificationsServiceComponent) {

  }

}
