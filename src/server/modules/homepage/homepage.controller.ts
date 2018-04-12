import { Controller, Get } from '@nestjs/common';

@Controller('api/home')
export class HomepageController {

  @Get('reasons')
  getReasons() {
    return [
      {
        image: 'https://maxcdn.icons8.com/app/uploads/2017/05/Like-500.png',
        title: 'Nothing can happen. Except fall in love',
        text: 'LoveHub works hard to make sure you don’t have to worry about security and privacy when looking for a partner online: 128bit SSL encryption. ID check. Profiles verified personally by our staff. Secure photo albums. What else can happen? Only one thing: that you fall in love.'
      },
      {
        image: 'https://maxcdn.icons8.com/app/uploads/2017/05/Like-500.png',
        title: 'Love is more than a coincidence',
        text: 'So we can bring you the matches with the most potential for a happy and long-lasting relationship, we rely on findings from 40 years of research in this field: The Parship principle® analyzes 32 personality traits and is based on a matching algorithm of 136 rules.Sounds complicated. Mathematical. Psychological. But it is very simple: Parship searches - you find.'
      },
      {
        image: 'https://maxcdn.icons8.com/app/uploads/2017/05/Like-500.png',
        title: 'Easy ice-breakers',
        text: 'LoveHub Connection makes it easy to break the ice. If you see someone you like, simply like them. It\'s easy and free, and as you gain the confidence you can follow it up with a message. It doesn\'t need to be hard!'
      },
      {
        image: 'https://maxcdn.icons8.com/app/uploads/2017/05/Like-500.png',
        title: 'The Serious Online Dating Site',
        text: 'LoveHub is one of the leading online matchmaking agencies for discerning singles. By means of an objective, the service helps its members to find love. LoveHub wants to make people happy. it\'s often difficult to find places to meet other single — online LoveHub dating solves this problem. Connection lets you meet other Single who are also looking for a relationship.'
      },
      {
        image: 'https://maxcdn.icons8.com/app/uploads/2017/05/Like-500.png',
        title: 'Discretion and security',
        text: 'LoveHub has some unique features. Firstly, you control who sees your profile photo. Secondly, we carry out more profile checks than any other dating site. When using the site, members can only communicate through Parship’s anonymous contact and messaging system. At all points, you choose whether you supply another member with further personal details.'
      },
      {
        image: 'https://maxcdn.icons8.com/app/uploads/2017/05/Like-500.png',
        title: 'Help when you need it',
        text: 'Our dedicated, award-winning support team are only a quick email away should you need help. our members are mostly professionals who know what really matters in life. Our members are looking for a long-term relationship, not just a quick fling.'
      },
    ];
  }

  @Get('feedbacks')
  getFeedbacks(){
    return [
      {
        image: 'http://www.sugarweddings.com/files/styles/width-640/public/happy%20couple.jpg?itok=vZGqNKNU',
        title: 'Los Angeles',
        text: 'We had such a great time in LA!',
        info: 'The site has worked out for me very well. I want to pursue the love that I have found without any further distraction, so I wish everyone previously involved the very best wishes and good luck as afforded to myself.'
      },
      {
        image: 'https://media.gettyimages.com/photos/guy-couple-hugging-and-smiling-picture-id553923087',
        title: 'Chicago',
        text: 'Thank you, Chicago!',
        info: 'Great site - a lot of excellent potential matches. The individual questions you set out give a useful guide to find potential matches. Most importantly the option to write a larger piece affords the opportunity to give a more rounded impression of somebody’s character and interests. I would highly recommend this dating website.'

      },
      {
        image: 'https://hips.hearstapps.com/wdy.h-cdn.co/assets/cm/15/09/768x516/54ebac28dc92a_-_unspoken-rules-xl.jpg?resize=768:*',
        title: 'New York',
        text: 'We love the Big Apple!',
        info: 'Not only did I find my match on this site, but we\'re now married. Thank you for putting us in touch - she is the best thing that\'s ever happened to me!'
      },
    ];
  }

  @Get('slider')
  getSlider(){
    return [
      {
        image: 'http://www.sugarweddings.com/files/styles/width-640/public/happy%20couple.jpg?itok=vZGqNKNU',
        title: 'Los Angeles',
        text: 'We had such a great time in LA!'
      },
      {
        image: 'https://media.gettyimages.com/photos/guy-couple-hugging-and-smiling-picture-id553923087',
        title: 'Chicago',
        text: 'Thank you, Chicago!'
      },
      {
        image: 'https://hips.hearstapps.com/wdy.h-cdn.co/assets/cm/15/09/768x516/54ebac28dc92a_-_unspoken-rules-xl.jpg?resize=768:*',
        title: 'New York',
        text: 'We love the Big Apple!'
      },
    ];
  }
}
