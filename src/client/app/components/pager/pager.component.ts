import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/range';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/toArray';

@Component({
  moduleId: module.id,
  selector: 'app-pager',
  templateUrl: 'pager.component.html',
  styleUrls: ['pager.component.scss']
})
export class PagerComponent implements OnInit, OnChanges {

  @Input() offset: number;
  @Input() perPage: number;
  @Input() size: number;
  pagesToShow: number = 3;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  pages: Observable<number[]>;
  currentPage: number;
  totalPages: number;

  ngOnInit(): void {
    this.getPages(this.offset, this.perPage, this.size);
  }

  ngOnChanges(): void {
    this.getPages(this.offset, this.perPage, this.size);
  }

  getPages(offset: number, limit: number, size: number) {
    this.currentPage = this.getCurrentPage(offset, limit);
    this.totalPages = this.getTotalPages(limit, size);
    this.pages = Observable.range(-this.pagesToShow, this.pagesToShow * 2 + 1)
      .map(offset => this.currentPage + offset)
      .filter(page => this.isValidPageNumber(page, this.totalPages))
      .toArray();
  }

  isValidPageNumber(page: number, totalPages: number): boolean {
    return page > 0 && page <= totalPages;
  }

  getCurrentPage(offset: number, limit: number): number {
    return Math.floor(offset / limit) + 1;
  }

  getTotalPages(limit: number, size: number): number {
    return Math.ceil(Math.max(size, 1) / Math.max(limit, 1));
  }

  selectPage(page: number, event) {
    this.cancelEvent(event);
    if (this.isValidPageNumber(page, this.totalPages)) {
      this.pageChange.emit((page - 1) * this.perPage);
    }
  }

  cancelEvent(event) {
    event.preventDefault();
  }
}
