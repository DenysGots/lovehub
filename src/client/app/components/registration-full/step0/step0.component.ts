import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-step0',
  templateUrl: './step0.component.html',
  styleUrls: ['../registration-full.component.scss']
})
export class Step0Component implements OnInit {

  @Input() stage: number;
  @Output() sexEvent = new EventEmitter<string>();
  constructor() { }
  ngOnInit() {
  }
  selectSex(sex: string) {
    this.sexEvent.emit(sex);
  }
  // isNext() {
  // }
  // isPrev() {
  // }
  // isEnable() {
  // }
  // isDisable() {
  // }
}
