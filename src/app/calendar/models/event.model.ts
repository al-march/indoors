export class CalendarEvent {
  constructor(
    public date: number,
    public message: string,
    public people: string[],
  ) {}
}
