import { Injectable } from '@angular/core';
import { AbstractStorage } from '@storage/abstract.storage';
import { CalendarEvent } from '@calendar/models';
import dayjs from 'dayjs';
import { Subject } from 'rxjs';

interface CalendarStorageState {
  events: Record<number, CalendarEvent>;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarStorage extends AbstractStorage<CalendarStorageState> {

  private update$$ = new Subject();
  valueChange$ = this.update$$.asObservable();

  constructor() {
    super('calendar');
  }

  async setEvent(event: CalendarEvent) {
    const date = dayjs(event.date);
    const item = {[+date.toDate()]: event};
    this.set('events', item);
    this.update$$.next(this.getState());
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
