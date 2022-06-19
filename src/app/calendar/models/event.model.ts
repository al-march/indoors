export class CalendarEvent {
  id?: string;

  constructor(
    public date: number,
    public title: string,
    public message?: string,
    public people?: string[],
  ) {}
}
