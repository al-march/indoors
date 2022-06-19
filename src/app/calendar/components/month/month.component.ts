import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges
} from '@angular/core';
import dayjs, { Dayjs } from 'dayjs';
import { Month, Day, CalendarEvent } from '@calendar/models';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthComponent implements OnInit, OnChanges {

  @Input()
  date = dayjs();

  @Input()
  events: Record<number, CalendarEvent[]> = {};

  @Output()
  createEvent = new EventEmitter<CalendarEvent>();

  week = this.getWeek();
  month: Month = new Month(dayjs());
  days: Day[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['date']) {
      const month = new Month(this.date);
      this.month = month;
      this.days = month.getMonthDays();
    }
  }

  eventsByDay(day: number) {
    return this.events[day] || [];
  }

  isDayFromMonth(day: Dayjs) {
    return day.add(1, 'second').isBetween(
      this.month.date.startOf('month'),
      this.month.date.endOf('month'),
      'millisecond'
    );
  }

  onCreateEvent(event: CalendarEvent) {
    this.createEvent.emit(event);
  }

  getWeek() {
    return new Array(7)
      .fill(0)
      .map((day, index) => (
        dayjs().weekday(day + index).format('dd')
      ));
  }
}
