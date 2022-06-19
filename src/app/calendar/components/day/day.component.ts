import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarEvent, Day } from '@calendar/models';

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

  @Output()
  createEvent = new EventEmitter<CalendarEvent>();

  @Output()
  editEvent = new EventEmitter<CalendarEvent>();

  @Output()
  deleteEvent = new EventEmitter<CalendarEvent>();

  constructor() { }

  ngOnInit() {

  }

  onCreateEvent(event: CalendarEvent) {
    this.createEvent.emit(event)
  }

  onEditEvent(event: CalendarEvent) {
    this.editEvent.emit(event)
  }
}
