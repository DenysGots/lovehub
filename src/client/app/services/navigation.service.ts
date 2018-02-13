import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {
  menu = [
    {
      name: 'Home',
      link: 'home'
    },
    {
      name: 'About',
      link: 'home'
    },
    {
      name: 'Pricing',
      link: 'home'
    },
    {
      name: 'Blog',
      link: 'home'
    },
    {
      name: 'Log in/Register',
      link: 'home'
    },
  ];

  constructor() { }

  getMenuItems(): object[]{
    return this.menu;
  };

}
