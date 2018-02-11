import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-sidebar-menu',
  templateUrl: 'sidebar-menu.component.html',
  styleUrls: ['sidebar-menu.component.scss']
})
export class SidebarMenuComponent {

  searchType = 'search';
  searchPlaceholder = 'Enter a favourite name..';
  searchValue = '';

  rangeType = 'range';
  rangePlaceholder = 'Enter a favourite age..';
  rangeValue = '0';

  radioType = 'radio';
  radioPlaceholder = 'Enter a favourite gender..';
  radioValueM = 'male';
  radioValueF = 'female';
}
