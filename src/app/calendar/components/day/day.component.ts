import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarEvent, Day } from '@calendar/models';
import dayjs, { Dayjs } from 'dayjs';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
  host: {
    'class': 'h-full flex items-stretch justify-stretch ring-1 ring-base-300 bg-base-100'
  }
})
export class DayComponent implements OnInit {

  @Input()
  day?: Day;

  @Input()
  disabled = false;

  @Input()
  events: CalendarEvent[] = [];

  @Input()
  active?: Dayjs;

  @Output()
  createEvent = new EventEmitter<CalendarEvent>();

  @Output()
  editEvent = new EventEmitter<CalendarEvent>();

  @Output()
  deleteEvent = new EventEmitter<CalendarEvent>();

  get isActive() {
    const day = this.day?.date.startOf('day');
    const activeDay = dayjs(this.active).startOf('day');
    if (day && activeDay) {
      return +day.toDate() === +activeDay.toDate();
    }
    return false;
  }

  constructor() { }

  ngOnInit() {

  }

  onCreateEvent(event: CalendarEvent) {
    this.createEvent.emit(event);
  }

  onEditEvent(event: CalendarEvent) {
    this.editEvent.emit(event);
  }
}
