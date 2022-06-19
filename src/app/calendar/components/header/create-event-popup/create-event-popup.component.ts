import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import dayjs, { Dayjs } from 'dayjs';
import { debounceTime, tap } from 'rxjs';

export interface CreateEventPopupSubmit {
  date: Dayjs,
  message: string;
}

@Component({
  selector: 'app-create-event-popup',
  templateUrl: './create-event-popup.component.html',
  styleUrls: ['./create-event-popup.component.css']
})
export class CreateEventPopupComponent implements OnInit {

  @Output()
  close = new EventEmitter();

  @Output()
  createEvent = new EventEmitter<CreateEventPopupSubmit>();

  form = this.fb.group({
    date: ['', Validators.required],
    message: ['', Validators.required],
  });


  get date() {
    return this.form.get('date');
  }

  get message() {
    return this.form.get('message');
  }

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    const date = this.form.get('date');
    if (date) {
      date.valueChanges.pipe(
        debounceTime(200),
        tap(() => this.validateDate())
      ).subscribe();
    }
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    this.validateDate();
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    const value: CreateEventPopupSubmit = {
      date: dayjs(this.form.value.date, ['D MMMM, HH:mm', 'D MMMM'], 'ru'),
      message: this.form.value.message || ''
    };
    this.createEvent.emit(value);
  }

  validateDate() {
    const date = this.form.get('date');
    const isValid = dayjs(date?.value, ['D MMMM, HH:mm', 'D MMMM'], 'ru').isValid();
    date?.setErrors(isValid ? null : {invalidDate: isValid});
  }
}
