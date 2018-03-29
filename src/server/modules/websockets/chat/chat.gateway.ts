import { WebSocketGateway, SubscribeMessage, OnGatewayConnection } from '@nestjs/websockets';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { CreateMessageDto } from '../../api/chat-messages/dto/create-message.dto';
import { ChatMessagesService } from '../../api/chat-messages/chat-messages.service';
import { NotificationService } from '../notification/notification.service';

@WebSocketGateway({namespace: 'chat'})
export class ChatGateway{
  connected = [];

  constructor(
    private messagesService: ChatMessagesService,
    private notifService: NotificationService){}

  
  @SubscribeMessage('changeRoom')
  changeRoom(client, data) {
    const chat = JSON.parse(data);

    client.leave(chat.prevChatId);
    client.join(chat.chatId);
  }

  @SubscribeMessage('send')
  getNewMessage(client, data) {
    const {chat, message}= JSON.parse(data).data;
    console.log('a', chat, message)
    
    this.messagesService.create(chat.chatId, message as CreateMessageDto);

    client.to(chat.chatId).emit('resFromServer', message);

    this.notifService.sendNotification(chat, message);
    
    return { event: 'resFromServer', data: message};
  }
}
