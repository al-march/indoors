import { Injectable } from '@angular/core';
import { AbstractStorage } from '@storage/abstract.storage';
import { CalendarEvent } from '@calendar/models';
import { filter, map, ReplaySubject } from 'rxjs';
import dayjs from 'dayjs';
import { v4 } from 'uuid';


interface CalendarStorageState {
  events: Record<number, CalendarEvent[]>;
}

const generateUUID = () => {
  return v4();
};

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
    event.id = generateUUID();
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
    return event;
  }

  async getDayEvents(date: number): Promise<CalendarEvent[]> {
    const events = await this.getEvents();
    return events[date];
  }

  async getEvent(event: CalendarEvent): Promise<CalendarEvent | undefined> {
    if (!event.id) {
      throw new Error('Event ID is required');
    }
    const startOfDay = +dayjs(event.date).startOf('day').toDate();
    const dayEvents = await this.getDayEvents(startOfDay);
    return dayEvents.find(e => e.id === event.id);
  }

  async updateEvent(event: CalendarEvent): Promise<CalendarEvent> {
    const item = await this.getEvent(event);
    if (item) {
      item.title = event.title;
      item.date = event.date;
      item.people = event.people;
      item.message = event.message;

      this.state$$.next(this.getState());
      this.update();
      return item;
    }
    throw new Error(`Event with id: ${event.id} not found`);
  }

  async removeEvent(event: CalendarEvent) {
    const dayKey = +dayjs(event.date).startOf('day').toDate();
    const events = await this.getEvents();
    if (events[dayKey]) {
      events[dayKey] = events[dayKey].filter(e => e.id !== event.id);
    }
    this.state$$.next(this.getState());
    this.update();
  }

  async getEvents(): Promise<Record<number, CalendarEvent[]>> {
    const events = this.get('events');
    if (events) {
      return events;
    }
    return {};
  }
}
