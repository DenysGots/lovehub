import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {
  menu = [
    {
      name: 'Home',
      link: 'home'
    },
    {
      name: 'Contact',
      link: 'contact',
    },
    {
      name: 'Search',
      link: 'search',
    },
    {
      name: 'User Profile',
      link: 'user-profile',
    },
    {
      name: 'Log in/Register',
      link: 'login'
    },
    {
      name: 'Matching',
      link: 'matching'
    },
  ];

  constructor() { }

  getMenuItems(): object[] {
    return this.menu;
  }

}
