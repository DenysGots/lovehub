import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import Message from '../../../client/app/models/message';



@Controller('api/messages')
export class ChatController {
  chats = [
    new Message(1, 'hello'),
    new Message(2, 'hi'),
    new Message(2, 'how are you?'),
    new Message(1, 'i`m fine, thanks'),
    // new Chat(
    //   1,
    //   'Maura Jo',
    //   'https://i.pinimg.com/736x/fb/e3/75/fbe37552637081f7bced381c7c464f3b--illustration-girl-girl-illustrations.jpg',
    //   'Hello',
    //   [
    //     {
    //       user: 'Ivan Ivanov',
    //       message: 'Hello'
    //     },
    //     {
    //       user: 'Petya Petrov',
    //       message: 'Hi'
    //     },
    //     {
    //       user: 'Vasya Pupkin',
    //       message: 'Hi'
    //     },
    //     {
    //       user: 'Ivan Ivanov',
    //       message: 'Hello'
    //     }
    //   ]
    // ),
    // new Chat(
    //   2,
    //   'Fallon Mcsorley',
    //   'https://static.pexels.com/photos/450212/pexels-photo-450212.jpeg',
    //   'Hello',
    //   []
    // ),
    // new Chat(
    //   3,
    //   'Otilia Daws',
    //   'https://cdn.vox-cdn.com/thumbor/q60YIhtwWgRaIv_FDKx55UgICRw=/0x0:999x749/1200x800/filters:focal(0x0:999x749)/cdn.vox-cdn.com/uploads/chorus_image/image/49439009/millennials.0.jpg',
    //   'Hello',
    //   []
    // ),
    // new Chat(
    //   4,
    //   'Angelina Jolie',
    //   'http://cdn.playbuzz.com/cdn/f761a022-4c56-4b17-8aa4-b93db29001c3/de3a2593-5765-492e-8069-84e4ebf73347.jpg',
    //   'Hello',
    //   []
    // ),
    // new Chat(
    //   5,
    //   'Cassy Cuneo',
    //   'http://st.mngbcn.com/usernus/999/999/sections_rebajas_step4/rebajas_he/man.jpg?ts=1501759791000&imwidth=312&imdensity=1',
    //   'Hello',
    //   []
    // ),
    // new Chat(
    //   4,
    //   'Angelina Jolie',
    //   'http://cdn.playbuzz.com/cdn/f761a022-4c56-4b17-8aa4-b93db29001c3/de3a2593-5765-492e-8069-84e4ebf73347.jpg',
    //   'Hello',
    //   []
    // ),
    // new Chat(
    //   5,
    //   'Cassy Cuneo',
    //   'http://st.mngbcn.com/usernus/999/999/sections_rebajas_step4/rebajas_he/man.jpg?ts=1501759791000&imwidth=312&imdensity=1',
    //   'Hello',
    //   []
    // ),
  ];

    
  @Get('')
  getMessages(@Query() query){
    // if(query.chatId){
    //   return this.chats.find(chat => chat.chatId === +query.chatId);
    // }
      
    return this.chats;
  }
    

}
