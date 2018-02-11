import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  menu: object[];

  constructor(private navService: NavigationService) { }

  ngOnInit() {
    this.getMenu();
  }

  getMenu(): void {
    this.menu = this.navService.getMenuItems();
  }

}
