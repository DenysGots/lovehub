import { Component } from '@nestjs/common';
// import { ChatListService } from '../../api/chat-list/chat-list.service';

@Component()
export class NotificationService {
    connected = [];

    constructor() {}//, private chatListService: ChatListService

    async connect(socket, userId){
        if(!this.connected.includes(conn => conn.socket === socket)){
            this.connected.push({
              socket,
              userId
            });
        }

        console.log('new', this.connected.map(i => userId));
    }

    disconnect(socket){
        const index = this.connected.indexOf(conn => conn.socket === socket);
        if(index >= 0){
            this.connected.splice(index,1);
        }

        console.log('connected after disconnect', this.connected.map(i => i.chats));
    }

    sendNotification(chat, message){
        const conn = this.connected
        .find(conn => conn.userId === chat.friendId);
        
      conn.socket.emit('notification', {type: 'notification', message});
    }
}
