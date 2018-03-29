import { Component } from '@nestjs/common';

@Component()
export class NotificationService {
    connected = [];

    constructor() {}

    connect(socket, userId){
        if(!this.connected.includes(conn => conn.socket === socket)){
            this.connected.push({
              socket,
              userId
            });
        }
    }

    disconnect(socket){
        const index = this.connected.findIndex(conn => conn.socket.id === socket.id);
        
        if(index >= 0){
            this.connected.splice(index,1);
        }
    }

    sendNotification(chat, message){
        const conn = this.connected.find(conn => conn.userId === chat.friendId);

        if(conn){
            conn.socket.emit('notification', {
                type: 'notification',
                title: 'New message',
                text: message.text
            });
        }
    }
}
