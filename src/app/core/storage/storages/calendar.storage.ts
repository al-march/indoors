import { Injectable } from '@angular/core';
import { AbstractStorage } from '@storage/abstract.storage';
import { CalendarEvent } from '@calendar/models';
import { map, ReplaySubject } from 'rxjs';

interface CalendarStorageState {
  events: Record<number, CalendarEvent>;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarStorage extends AbstractStorage<CalendarStorageState> {

  private state$$ = new ReplaySubject<Partial<CalendarStorageState>>();
  valueChange$ = this.state$$.asObservable();
  eventsChange$ = this.valueChange$.pipe(
    map(state => state.events)
  );

  constructor() {
    super('calendar');
    this.state$$.next(this.getState());
  }

  async setEvent(event: CalendarEvent) {
    const events = await this.getEvents();
    this.set('events', {...events, [event.date]: event});
    this.state$$.next(this.getState());
  }

  async getEvent(date: number): Promise<CalendarEvent | null> {
    const events = await this.getEvents();
    const event = events[date];
    return event || null;
  }

  async getEvents(): Promise<Record<number, CalendarEvent>> {
    const events = this.get('events');
    if (events) {
      return events;
    }
    return {};
  }
}
