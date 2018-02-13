import {Component, Input} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-user-filter',
  templateUrl: 'user-filter.component.html',
  styleUrls: ['user-filter.component.scss']
})
export class UserFilterComponent {

  @Input() type: string;
  @Input() placeholder: string;
  @Input() value: string;

  /*
  onSubmit() {
    emiter.emit(this.type, value);
  }
  */
}
