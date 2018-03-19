import { Component, OnInit } from '@angular/core';
import Chat from '../../models/chat';
import { WindowService } from '../../services/window.service';
import { ChatService } from '../../services/chat.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  height = 100;
  chats = [
    new Chat(
      1,
      'Maura Jo',
      'https://i.pinimg.com/736x/fb/e3/75/fbe37552637081f7bced381c7c464f3b--illustration-girl-girl-illustrations.jpg',
      'Hello',
      [
        {
          user: 'Ivan Ivanov',
          message: 'Hello'
        },
        {
          user: 'Petya Petrov',
          message: 'Hi'
        },
        {
          user: 'Vasya Pupkin',
          message: 'Hi'
        },
        {
          user: 'Ivan Ivanov',
          message: 'Hello'
        }
      ]
    ),
    new Chat(
      2,
      'Fallon Mcsorley',
      'https://static.pexels.com/photos/450212/pexels-photo-450212.jpeg',
      'Hello',
      []
    ),
    new Chat(
      3,
      'Otilia Daws',
      'https://cdn.vox-cdn.com/thumbor/q60YIhtwWgRaIv_FDKx55UgICRw=/0x0:999x749/1200x800/filters:focal(0x0:999x749)/cdn.vox-cdn.com/uploads/chorus_image/image/49439009/millennials.0.jpg',
      'Hello',
      []
    ),
    new Chat(
      4,
      'Angelina Jolie',
      'http://cdn.playbuzz.com/cdn/f761a022-4c56-4b17-8aa4-b93db29001c3/de3a2593-5765-492e-8069-84e4ebf73347.jpg',
      'Hello',
      []
    ),
    new Chat(
      5,
      'Cassy Cuneo',
      'http://st.mngbcn.com/usernus/999/999/sections_rebajas_step4/rebajas_he/man.jpg?ts=1501759791000&imwidth=312&imdensity=1',
      'Hello',
      []
    ),
    new Chat(
      4,
      'Angelina Jolie',
      'http://cdn.playbuzz.com/cdn/f761a022-4c56-4b17-8aa4-b93db29001c3/de3a2593-5765-492e-8069-84e4ebf73347.jpg',
      'Hello',
      []
    ),
    new Chat(
      5,
      'Cassy Cuneo',
      'http://st.mngbcn.com/usernus/999/999/sections_rebajas_step4/rebajas_he/man.jpg?ts=1501759791000&imwidth=312&imdensity=1',
      'Hello',
      []
    ),
  ];
  messages = [];

  constructor(
    private windowService: WindowService,
    private chat: ChatService,
    private http: HttpClient
  ) {
    this.height = this.windowService.freeHeight;
   }
  
  send(){
    this.chat.sendMessage({user: 'Tanya Marych', userssage: 'Love it'});
  }

  onChatChecked(userssages){
    // this.dialog = userssages;
  }

  ngOnInit() {
  
    this.chat.messages.subscribe(msg => {
      console.log('msg', msg);
      this.messages = [...this.messages, JSON.parse(msg)];
    });

    this.http.get<any[]>('api/messages').subscribe((data) => {
      this.messages = data;
      console.log('!!data', data);
    });
  }
}
