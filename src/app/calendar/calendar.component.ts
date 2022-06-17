import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import dayjs from 'dayjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {

  month = dayjs();

  constructor() { }

  ngOnInit(): void {
  }

  next() {
    this.month = this.month.add(1, 'month');
  }

  prev() {
    this.month = this.month.subtract(1, 'month');
  }

}
