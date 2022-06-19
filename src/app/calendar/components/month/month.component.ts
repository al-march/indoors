import {
  ChangeDetectionStrategy, ChangeDetectorRef,
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

  @Output()
  editEvent = new EventEmitter<CalendarEvent>();

  week = this.getWeek();
  month: Month = new Month(dayjs());
  days: Day[] = [];

  constructor(
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['date']) {
      this.updateMonth(this.date);
    }
  }

  updateMonth(date: Dayjs) {
    const month = new Month(date);
    this.month = month;
    this.days = month.getMonthDays();
    this.ref.markForCheck();
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

  onEditEvent(event: CalendarEvent) {
    this.editEvent.emit(event)
  }

  getWeek() {
    return new Array(7)
      .fill(0)
      .map((day, index) => (
        dayjs().weekday(day + index).format('dd')
      ));
  }
}
