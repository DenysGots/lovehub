import {
  WebSocketGateway,
  SubscribeMessage,
  WsResponse,
  WebSocketServer,
  WsException,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{
  connections = [];

  handleConnection(socket){
    this.connections.push(socket);
  }

  handleDisconnect(socket){
    this.connections.splice(this.connections.indexOf(socket), 1);
  }

  @SubscribeMessage('send')
  getNewMessage(client, data) {
    const res = { data, event: 'resFromServer' };

    console.log('con', this.connections.length, res)
    this.connections.forEach(socket => socket.emit('resFromServer',data));
  }

  // onEvent(client, data): Observable<WsResponse<number>> {
  //   const event = 'events';
  //   const response = [1, 2, 3];

  //   return Observable.from(response).map(res => ({ event, data: res }));
  // }
}
