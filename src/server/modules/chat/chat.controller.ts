import { Controller, Get, Post, Delete, Body } from '@nestjs/common';


@Controller('api/messages')
export class ChatController {
    messages = [
        {
          "user": "Tanya Marych",
          "message": "Hello"
        },{
          "user": "Ivan Ivanov",
          "message": "Hi"
        }
      ];
    
    @Get('')
    getMessages(){
        return this.messages;
    }
    

}
