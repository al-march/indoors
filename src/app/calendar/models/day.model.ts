import dayjs, { Dayjs } from 'dayjs';

export class Day {
  get isToday() {
    return this.date.toISOString() === dayjs().startOf('day').toISOString();
  }

  get isWeekend() {
    return this.date.isoWeekday() === 7 || this.date.isoWeekday() === 6;
  }

  constructor(
    public date: Dayjs,
  ) {}
}
