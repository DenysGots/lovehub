import { WebSocketGateway, SubscribeMessage, OnGatewayConnection, WebSocketServer } from '@nestjs/websockets';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { CreateMessageDto } from '../../api/chat-messages/dto/create-message.dto';
import { ChatMessagesService } from '../../api/chat-messages/chat-messages.service';
import { NotificationService } from '../notification/notification.service';

@WebSocketGateway({namespace: 'chat'})
export class ChatGateway {
  @WebSocketServer() server;

  constructor(
    private messagesService: ChatMessagesService,
    private notifService: NotificationService) {}

  @SubscribeMessage('changeRoom')
  changeRoom(client, data) {
    const chat = JSON.parse(data);

    client.leave(chat.prevChatId);
    client.join(chat.chatId);
  }

  @SubscribeMessage('send')
  async getNewMessage(client, data) {
    const {chat, message} = JSON.parse(data);
    const dbMessage = await this.messagesService.create(chat.chatId, message as CreateMessageDto);

    this.notifService.sendNotification(chat.toUser, dbMessage);

    const res = {event: 'myMes', data: dbMessage};

    client.to(chat.chatId).emit('resFromServer', {event: 'newMes', data: dbMessage});

    const setLastReadToBoth = this.server.adapter.rooms[chat.chatId].length > 1;
    this.messagesService.setLastRead(dbMessage, setLastReadToBoth);

    return { event: 'resFromServer', data: res};
  }

  @SubscribeMessage('deleteMessage')
  async deleteMessage(client, data) {
    const parsedData = JSON.parse(data);
    const {chatId, msgId} = parsedData;
    console.log(msgId);
    const dbRes = await this.messagesService.deleteMessageById(chatId, msgId);
    console.log(dbRes);
    const result = { event: 'messageIdFromServer', msgId};
     return { event: 'resFromServer', data: result};
  }

  @SubscribeMessage('editMessage')
  async editMessage(client, data) {
      const parseData = JSON.parse(data);
      const {chatId, msgId, text} = parseData;
      console.log(parseData);
      const dbRes = await this.messagesService.editMessageText(chatId, msgId, text);
       const result = { event: 'modifiedMessage', msgId, text};

      return { event: 'resFromServer', data: result};
  }
}
