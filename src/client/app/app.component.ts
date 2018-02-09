import {Component, ElementRef, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  pongMessage$: Observable<any>;

  constructor() {}

  ngOnInit() { }
}
