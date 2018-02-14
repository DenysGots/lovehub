import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  findItems = [
    {
      image:'https://maxcdn.icons8.com/app/uploads/2017/05/Like-500.png',
      title:'Lorem impum',
      text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer '
    },
    {
      image:'https://maxcdn.icons8.com/app/uploads/2017/05/Like-500.png',
      title:'Lorem impum',
      text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
      image:'https://maxcdn.icons8.com/app/uploads/2017/05/Like-500.png',
      title:'Lorem impum',
      text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
      image:'https://maxcdn.icons8.com/app/uploads/2017/05/Like-500.png',
      title:'Lorem impum',
      text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer '
    },
    {
      image:'https://maxcdn.icons8.com/app/uploads/2017/05/Like-500.png',
      title:'Lorem impum',
      text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
      image:'https://maxcdn.icons8.com/app/uploads/2017/05/Like-500.png',
      title:'Lorem impum',
      text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
  ];

  reasons = [
    {
      image:'https://www.w3schools.com/bootstrap4/la.jpg',
      title:'Los Angeles',
      text:'We had such a great time in LA!'
    },
    {
      image:'https://www.w3schools.com/bootstrap4/chicago.jpg',
      title:'Chicago',
      text:'Thank you, Chicago!'
    },
    {
      image:'https://www.w3schools.com/bootstrap4/ny.jpg',
      title:'New York',
      text:'We love the Big Apple!'
    },
  ];

  constructor() {
   }

  ngOnInit() {
  }

}
