import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import dayjs from 'dayjs';
import { CalendarStorage } from '@storage/storages';
import { CalendarEvent } from '@calendar/models';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {

  month = dayjs();
  events$ = this.calendar.eventsChange$;

  constructor(
    private calendar: CalendarStorage
  ) { }

  ngOnInit(): void {
  }

  prev() {
    this.month = this.month.subtract(1, 'month');
  }

  next() {
    this.month = this.month.add(1, 'month');
  }

  createEvent(event: CalendarEvent) {
    this.month = dayjs(event.date);
    return this.calendar.setEvent(event);
  }

  today() {
    this.month = dayjs();
  }
}
