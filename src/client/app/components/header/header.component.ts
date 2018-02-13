import { Component, OnInit } from '@angular/core';

import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menu: object[];
  logo: string = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Apple.svg/1024px-Apple.svg.png';

  constructor(private navService: NavigationService) { }

  ngOnInit() {
    this.getMenu();
  }

  getMenu(): void {
    this.menu = this.navService.getMenuItems();
  }

}
