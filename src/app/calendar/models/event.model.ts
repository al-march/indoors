export class CalendarEvent {
  constructor(
    public date: number,
    public title: string,
    public message?: string,
    public people?: string[],
  ) {}
}
