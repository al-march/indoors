import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import dayjs, { Dayjs } from 'dayjs';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthComponent implements OnInit, OnChanges {

  @Input()
  month = dayjs();

  days: Dayjs[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['month'].currentValue) {
      this.days = this.getMonthDays(this.month);
    }
  }

  getMonthDays(month: Dayjs) {
    const clone = month.clone();
    const monthDays = this.getDaysOfMonth(clone);
    const daysBefore = this.getDaysBefore(monthDays[0]);
    const daysAfter = this.getDaysAfter(monthDays[monthDays.length - 1]);

    return [...daysBefore, ...monthDays, ...daysAfter];
  }

  getDaysOfMonth(currentMonth: Dayjs) {
    const output: Dayjs[] = [];
    const allDays = currentMonth.daysInMonth();

    let count = 1;
    while (count <= allDays) {
      const day = dayjs(new Date(currentMonth.year(), currentMonth.month(), count));
      output.push(day);
      count++;
    }

    return output;
  }

  getDaysBefore(firstDay: Dayjs) {
    const output: Dayjs[] = [];
    const dayOfWeek = firstDay.weekday();

    let count = 0;
    while (dayOfWeek !== count) {
      const day = firstDay.subtract(dayOfWeek - count, 'day');
      output.push(day);
      count++;
    }

    return output;
  }

  getDaysAfter(lastDay: Dayjs) {
    const output: Dayjs[] = [];
    let dayOfWeek = lastDay.weekday();

    let dayIncrement = 1;
    const count = 6;
    while (dayOfWeek !== count) {
      const day = lastDay.add(dayIncrement++, 'day');
      output.push(day);
      dayOfWeek++;
    }

    return output;
  }
}
