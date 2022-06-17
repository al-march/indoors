export class CalendarEvent {
  constructor(
    public date: string,
    public message: string,
    public people: string[],
  ) {}
}
