import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarEvent } from '@calendar/models';
import { FormBuilder, Validators } from '@angular/forms';
import dayjs, { Dayjs } from 'dayjs';

@Component({
  selector: 'app-calendar-event-form',
  templateUrl: './calendar-event-form.component.html',
  styleUrls: ['./calendar-event-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarEventFormComponent implements OnInit {

  @Input()
  date?: Dayjs;

  @Input()
  event?: CalendarEvent;

  @Output()
  create = new EventEmitter<CalendarEvent>();

  @Output()
  edit = new EventEmitter<CalendarEvent>();

  @Output()
  delete = new EventEmitter<CalendarEvent>();

  format = 'D, MMMM, YYYY';

  get isEdit() {
    return !!this.event;
  }

  form = this.fb.group({
    title: ['', Validators.required],
    date: ['', Validators.required],
    message: '',
    people: ''
  });

  get titleInput() {
    return this.form.get('title');
  }

  get dateInput() {
    return this.form.get('date');
  }

  get messageInput() {
    return this.form.get('message');
  }

  get peopleInput() {
    return this.form.get('people');
  }

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.date) {
      this.dateInput?.setValue(this.date.format(this.format));
    }

    if (this.isEdit) {
      this.form.patchValue({
        title: this.event?.title || '',
        date: dayjs(this.event?.date)?.format(this.format) || '',
        message: this.event?.message || '',
        people: this.event?.people?.join(',')
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    const parseDate = () => +dayjs(this.dateInput?.value, this.format, 'ru').toDate();

    const event: CalendarEvent = {
      id: this.event?.id || '',
      title: this.titleInput?.value || '',
      date: parseDate(),
      people: this.peopleInput?.value?.split(',') || [''],
      message: this.messageInput?.value || ''
    };

    this.emitSubmit(event);

    if (!this.isEdit) {
      this.form.reset({
        date: this.date?.format(this.format) || ''
      });
    }
  }

  emitSubmit(event: CalendarEvent) {
    this.isEdit
      ? this.edit.emit(event)
      : this.create.emit(event);
  }

  onDelete() {
    if (this.isEdit) {
      this.delete.emit(this.event);
    }
  }
}
