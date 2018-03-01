import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'chat-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input() messages: Array<object>;
  
  constructor() { }

  ngOnInit() {
  }

}
