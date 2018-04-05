import { Component, OnInit } from '@angular/core';

import { AdministratorService } from '../../../services/administrator.service';

@Component({
  selector: 'app-administrator-search',
  templateUrl: './administrator-search.component.html',
  styleUrls: [
    '../shared/normalize.scss',
    '../shared/default-styles.scss',
    '../shared/default-layout-styles.scss',
    './administrator-search.component.scss']
})
export class AdministratorSearchComponent implements OnInit {
  public mainSectionIsVisible: boolean;
  public searchResults = {} as any;
  public isSearchUnsuccessful: boolean;

  constructor(private administratorService: AdministratorService) { }

  ngOnInit() {
    this.administratorService.navBarState.subscribe(data => {
      return this.mainSectionIsVisible = data;
    });

    this.administratorService.receivedSearchResults.subscribe(data => {
      (data.users && data.users.length > 0) ? (this.isSearchUnsuccessful = false) : (this.isSearchUnsuccessful = true);
      return this.searchResults = data;
    });
  }

}
