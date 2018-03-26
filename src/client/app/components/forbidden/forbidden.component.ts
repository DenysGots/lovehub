import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  moduleId: module.id,
  templateUrl: 'forbidden.component.html',
  styleUrls: ['forbidden.component.scss']
})
export class ForbiddenComponent {

  errorMessage = 'access forbidden!';
  userMessage = 'Your do not access to this resource';

  constructor(private el: ElementRef) {
  }

  /*
  ngOnInit(): void {
    let modal = this;

    document.body.appendChild(this.element);

    this.open();

    this.element.addListener('click', function (event: any) {
      const target = event.target;
      if (!target.closest('app-forbidden').length) {
        modal.close();
      }
    });
  }

  ngOnDestroy(): void {
    this.element.remove();
  }

  open(): void {
    this.element.show();
    document.body.classList.add('forbidden-modal-open');
  }

  close(): void {
    this.element.hide();
    document.body.classList.remove('forbidden-modal-open');
  }
  */
}
