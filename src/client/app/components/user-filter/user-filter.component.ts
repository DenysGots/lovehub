import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {SearchParam} from '../user-search/shared/search-param';

@Component({
  moduleId: module.id,
  selector: 'app-user-filter',
  templateUrl: 'user-filter.component.html',
  styleUrls: ['user-filter.component.css']
})
export class UserFilterComponent implements OnChanges {

  @Input() label: string;
  @Input() type: string;
  @Input() placeholder: string;
  @Input() value: string;
  @Output() onSearch = new EventEmitter<SearchParam>();

  ngOnChanges() {
  }

  search() {
    const searchParams: SearchParam = {
      searchType: this.type,
      searchValue: this.value
    };
    this.onSearch.emit(searchParams);
  }
}
