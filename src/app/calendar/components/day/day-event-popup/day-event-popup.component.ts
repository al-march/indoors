import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import dayjs, { Dayjs } from 'dayjs';
import { CalendarEvent } from '@calendar/models';

@Component({
  selector: 'app-day-event-popup',
  templateUrl: './day-event-popup.component.html',
  styleUrls: ['./day-event-popup.component.css']
})
export class DayEventPopupComponent implements OnInit {

  @Input()
  day = dayjs()

  @Output()
  close = new EventEmitter();

  @Output()
  create = new EventEmitter<CalendarEvent>();

  constructor() { }

  ngOnInit(): void {
  }

}
