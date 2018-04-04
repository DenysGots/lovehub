import { WebSocketGateway, SubscribeMessage, OnGatewayConnection, WebSocketServer } from '@nestjs/websockets';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { CreateMessageDto } from '../../api/chat-messages/dto/create-message.dto';
import { ChatMessagesService } from '../../api/chat-messages/chat-messages.service';
import { NotificationService } from '../notification/notification.service';

@WebSocketGateway({namespace: 'chat'})
export class ChatGateway{
  @WebSocketServer() server;

  constructor(
    private messagesService: ChatMessagesService,
    private notifService: NotificationService){}

  // @SubscribeMessage('readLast')
  // setReadLast(client, data) {
  //   const chat = JSON.parse(data);

  //   console.log('cha', chat);
  // }
  
  @SubscribeMessage('changeRoom')
  changeRoom(client, data) {
    const chat = JSON.parse(data);

    client.leave(chat.prevChatId);
    client.join(chat.chatId);
  }

  @SubscribeMessage('send')
  async getNewMessage(client, data) {
    const {chat, message}= JSON.parse(data).data;
    const dbMessage = await this.messagesService.create(chat.chatId, message as CreateMessageDto);
   
    this.notifService.sendNotification(chat.toUser, dbMessage);

    const res = {event: 'myMes', data: dbMessage};

    client.to(chat.chatId).emit('resFromServer', {event: 'newMes', data: dbMessage});

    const setLastReadToBoth = this.server.adapter.rooms[chat.chatId].length > 1;
    this.messagesService.setLastRead(dbMessage, setLastReadToBoth);

    return { event: 'resFromServer', data: res};
  }
}
