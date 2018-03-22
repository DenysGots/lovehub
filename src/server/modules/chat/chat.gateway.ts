import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({namespace: 'chat'})
export class ChatGateway{

  constructor(private messagesService: MessagesService){}

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

    this.messagesService.create(res.chatId, res.message as CreateMessageDto);

    client.to(parsedData.chatId).emit('resFromServer', res.message);
    
    return { event: 'resFromServer', data: res.message};
  }
}
