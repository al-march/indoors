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

  it('should create event', async () => {
    const date = dayjs();
    const event: CalendarEvent = {
      date: +date.toDate(),
      title: 'new event',
      people: ['Darya Ivanova'],
    };
    const eventWithId = await storage.setEvent(event);
    const storageEvent = await storage.getEvent(eventWithId);
    expect(storageEvent).toBeTruthy();
  });

  it('should get event by day', async () => {
    const date = dayjs();
    const event: CalendarEvent = {
      date: +date.toDate(),
      title: 'new event',
      people: ['Darya Ivanova'],
    };
    await storage.setEvent(event);
    const storageEvent = await storage.getDayEvents(+date.startOf('day').toDate());
    expect(storageEvent).toEqual([event]);
  });
  it('should get all events', async () => {
    const today = dayjs();
    const yesterday = today.subtract(1, 'day');
    const event1: CalendarEvent = {
      date: +today.toDate(),
      title: 'today event',
      people: [],
    };
    const event2: CalendarEvent = {
      date: +yesterday.toDate(),
      title: 'yesterday event',
      people: [],
    };

    await storage.setEvent(event1);
    await storage.setEvent(event2);

    const events = await storage.getEvents();

    expect(Object.values(events).length).toEqual(2);
    expect(events[+today.startOf('day').toDate()]).toEqual([event1]);
    expect(events[+yesterday.startOf('day').toDate()]).toEqual([event2]);
  });
  it('should accumulate events of day', async () => {
    const event = {
      date: +dayjs().toDate(),
      title: 'message',
    };
    await storage.setEvent(event);
    await storage.setEvent(event);

    const events = await storage.getEvents();
    const todayKey = +dayjs().startOf('day').toDate();

    expect(Object.values(events).length).toBe(1);
    expect(events[todayKey].length).toBe(2);
    expect(events[todayKey][0]).toEqual(event);
  });
  it('should emit new event', async () => {
    const date = dayjs();
    const event: CalendarEvent = {
      date: +date.toDate(),
      title: 'new event',
      people: ['Darya Ivanova'],
    };

    storage.eventsChange$.subscribe((events) => {
      expect(events).toBeTruthy();
      if (events) {
        const e = events[+date.startOf('day').toDate()];
        expect(e).toEqual([event]);
      }
    });

    await storage.setEvent(event);
  });
});
