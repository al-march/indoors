import { Injectable } from '@angular/core';
import { AbstractStorage } from '@storage/abstract.storage';
import { CalendarEvent } from '@calendar/models';
import { filter, map, ReplaySubject } from 'rxjs';
import dayjs from 'dayjs';

interface CalendarStorageState {
  events: Record<number, CalendarEvent[]>;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarStorage extends AbstractStorage<CalendarStorageState> {

  private state$$ = new ReplaySubject<Partial<CalendarStorageState>>();
  valueChange$ = this.state$$.asObservable().pipe(filter(filter => !!filter));
  eventsChange$ = this.valueChange$.pipe(
    map(state => state.events),
    filter(filter => !!filter),
  );

  constructor() {
    super('calendar');
    this.state$$.next(this.getState());
  }

  async setEvent(event: CalendarEvent) {
    const events = await this.getEvents();
    const key = +dayjs(event.date).startOf('day').toDate();
    const day = events[key];
    if (day) {
      day.push(event);
      this.set('events', {...events, [key]: day});
    } else {
      this.set('events', {...events, [key]: [event]});
    }
    this.state$$.next(this.getState());
  }

  async getEvent(date: number): Promise<CalendarEvent[] | []> {
    const events = await this.getEvents();
    const event = events[date];
    return event || [];
  }

  async getEvents(): Promise<Record<number, CalendarEvent[]>> {
    const events = this.get('events');
    if (events) {
      return events;
    }
    return {};
  }
}
