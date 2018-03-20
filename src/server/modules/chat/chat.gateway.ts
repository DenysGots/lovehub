import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

@WebSocketGateway({namespace: 'chat'})
export class ChatGateway{
  @SubscribeMessage('changeRoom')
  changeRoom(client, data) {
    const chat = JSON.parse(data);

    client.leave(chat.prevChatId);
    client.join(chat.chatId);
  }

  @SubscribeMessage('send')
  getNewMessage(client, data) {
    const parsedData = JSON.parse(data);
    const res = parsedData.data;

    client.to(parsedData.chatId).emit('resFromServer', res);
    
    return { event: 'resFromServer', data: res};
  }
}
