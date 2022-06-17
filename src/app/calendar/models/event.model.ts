import { Dayjs } from 'dayjs';

export class CalendarEvent {
  constructor(
    public day: Dayjs,
    public message: string,
    public people: string[],
  ) {}
}
