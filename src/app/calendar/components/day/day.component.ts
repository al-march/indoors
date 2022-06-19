import { Component, Input, OnInit } from '@angular/core';
import { CalendarEvent, Day } from '@calendar/models';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  @Input()
  day?: Day;

  @Input()
  disabled = false;

  @Input()
  events: CalendarEvent[] = [];

  constructor() { }

  ngOnInit() {

  }
}
