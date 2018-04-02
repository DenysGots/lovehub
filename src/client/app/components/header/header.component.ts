import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { NavigationService } from '../../services/navigation.service';
import { WindowService } from '../../services/window.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menu: object[];
  logo = '/assets/img/logo3.png';
  router: any;

  @ViewChild('header') elementView: ElementRef;

  constructor(
    private navService: NavigationService,
    private windowService: WindowService,
    _router: Router
  ) {
    this.router = _router;
  }

  ngOnInit() {
    const headerHeight = this.elementView.nativeElement.offsetHeight;

    this.getMenu();
    this.setHeaderHeight(headerHeight);
  }

  getMenu(): void {
    this.menu = this.navService.getMenuItems();
  }

  setHeaderHeight(height): void {
    this.windowService.headerHeight = height;
  }
}
