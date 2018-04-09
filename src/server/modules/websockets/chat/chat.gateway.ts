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

  @SubscribeMessage('changeRoom')
  async changeRoom(client, data) {
    const {prevChatId, chat} = JSON.parse(data);

    await this.messagesService.setRead(chat.chatId, chat.user.userId);

    client.leave(prevChatId);
    client.join(chat.chatId);

    this.notifService.sendSetRead(chat.user.userId, chat.chatId);
  }

  @SubscribeMessage('send')
  async getNewMessage(client, data) {
    const {chat, message}= JSON.parse(data);

    const isFriendOnline = await this.server.adapter.rooms[chat.chatId].length;
    message.read = isFriendOnline > 1;

    const dbMessage = await this.messagesService.create(chat.chatId, message as CreateMessageDto);
    const res = {event: 'newMessage', data: dbMessage};
    client.to(chat.chatId).emit('resFromServer', res);
    this.notifService.sendNotification(chat.user.userId, dbMessage);

    return { event: 'resFromServer', data:res};
  }
}
