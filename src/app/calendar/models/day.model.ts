import dayjs, { Dayjs } from 'dayjs';
import { CalendarEvent } from './event.model';
import { ReplaySubject } from 'rxjs';

export class Day {

  private events: CalendarEvent[] = [];
  private events$$ = new ReplaySubject<CalendarEvent[]>();

  events$ = this.events$$.asObservable();

  get isToday() {
    return this.date.toISOString() === dayjs().startOf('day').toISOString();
  }

  get isWeekend() {
    return this.date.isoWeekday() === 7 || this.date.isoWeekday() === 6;
  }

  constructor(
    public date: Dayjs,
  ) {}

  getEvents() {
    return this.events;
  }

  setEvent(event: CalendarEvent) {
    this.events.push(event);
    this.events$$.next(this.events);
  }
}
