import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  contacts = {
    phones:['+38 012 345 67 8*','+38 012 345 67 8*', '+38 012 345 67 8*'],
    address: 'Kyiv, Somestr str., 5',
    mail: 'write@us.now'
  };

  constructor(private router: Router) { }

  ngOnInit() {}

}
