import { CalendarStorage } from '@storage/storages/calendar.storage';
import { CalendarEvent } from '@calendar/models';
import dayjs from 'dayjs';

describe('CalendarStorage', () => {
  let storage: CalendarStorage;
  beforeEach(() => {
    localStorage.clear();
    storage = new CalendarStorage();
  });

  it('should create an instance', () => {
    expect(storage).toBeTruthy();
  });
  it('should set/get event', async () => {
    const date = dayjs();
    const event: CalendarEvent = {
      date: +date.toDate(),
      message: 'new event',
      people: ['Darya Ivanova'],
    };
    await storage.setEvent(event);
    const storageEvent = await storage.getEvent(+date.toDate());
    expect(storageEvent).toEqual(event);
  });
  it('should get all events', async () => {
    const today = dayjs();
    const yesterday = today.subtract(1, 'day');
    const event1: CalendarEvent = {
      date: +today.toDate(),
      message: 'today event',
      people: [],
    };
    const event2: CalendarEvent = {
      date: +yesterday.toDate(),
      message: 'yesterday event',
      people: [],
    };

    await storage.setEvent(event1);
    await storage.setEvent(event2);

    const events = await storage.getEvents();

    expect(events[+today.toDate()]).toEqual(event1);
    expect(events[+yesterday.toDate()]).toEqual(event2);
  });
  it('should emit new event', async () => {
    const date = dayjs();
    const event: CalendarEvent = {
      date: +date.toDate(),
      message: 'new event',
      people: ['Darya Ivanova'],
    };

    storage.valueChange$.subscribe((state) => {
      expect(state.events).toBeTruthy();
      const events = state.events;
      if (events) {
        const e = events[+date.toDate()];
        expect(e).toEqual(event);
      }
    });

    await storage.setEvent(event);
  });
});
