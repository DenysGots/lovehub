import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  templateUrl: 'forbidden.component.html',
  styleUrls: ['forbidden.component.scss']
})
export class ForbiddenComponent {

  errorMessage = 'Access forbidden!';
  errorStatus = '403';
  userMessage = 'Your do not access to this resource';

  constructor() { }

}
