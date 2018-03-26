import {Component, ElementRef, forwardRef, Input, ViewChild} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { CustomRenderService } from '../../../services/custom-render.service';

const INLINE_EDIT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InlineEditComponent),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'app-inline-edit',
  templateUrl: 'inline-edit.component.html',
  providers: [INLINE_EDIT_CONTROL_VALUE_ACCESSOR],
  styleUrls: ['inline-edit.component.scss']
})
export class InlineEditComponent implements ControlValueAccessor {

  @ViewChild('inlineEditControl') inlineEditControl: ElementRef;
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  private _value: string = '';
  public preValue: string = '';
  public editing: boolean = false;
  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  constructor(public element: ElementRef, private _renderer: CustomRenderService) { }

  get value(): any {
    return this._value;
  }

  set value(value: any) {
    if (value !== this._value) {
      this._value = value;
      this.onChange(value);
    }
  }

  public writeValue(value: any) {
    this._value = value;
  }

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  public onBlur($event: Event) {
    this.editing = false;
  }

  public edit(value) {
    if (this.disabled) {
      return;
    }

    this.preValue = value;
    this.editing = true;

    setTimeout(_ => this._renderer.invokeElementMethod(this.inlineEditControl,
      'focus'));
  }

}
