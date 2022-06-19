import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import dayjs, { Dayjs } from 'dayjs';
import { CalendarStorage } from '@storage/storages';
import { CalendarEvent } from '@calendar/models';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit, OnDestroy {

  month = dayjs();
  activeDay = dayjs();
  events: Record<number, CalendarEvent[]> = {};

  constructor(
    private calendar: CalendarStorage
  ) { }

  private destroy$ = new Subject();

  ngOnInit(): void {
    this.calendar.eventsChange$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(events => {
      if (events) {
        this.events = {...events};
      } else {
        this.events = {};
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  prev() {
    this.month = this.month.subtract(1, 'month');
  }

  next() {
    this.month = this.month.add(1, 'month');
  }

  setMonth(day: Dayjs) {
    if (+this.month.startOf('month').toDate() !== +day.startOf('month').toDate()) {
      this.month = day;
    }
  }

  createEvent(event: CalendarEvent) {
    this.setMonth(dayjs(event.date));
    return this.calendar.setEvent(event).catch(e => {
      alert(e);
    });
  }

  editEvent(event: CalendarEvent) {
    this.setMonth(dayjs(event.date));
    return this.calendar.updateEvent(event).catch(e => {
      alert(e);
    });
  }

  deleteEvent(event: CalendarEvent) {
    return this.calendar.removeEvent(event).catch(e => {
      alert(e);
    });
  }

  activateDay(day: Dayjs) {
    this.setMonth(day);
    this.activeDay = day;
  }

  today() {
    this.setMonth(dayjs());
  }
}
