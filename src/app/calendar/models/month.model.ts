import dayjs, { Dayjs } from 'dayjs';
import { Day } from './day.model';

export class Month {
  constructor(
    public date: Dayjs
  ) {}

  getMonthDays() {
    const clone = this.date.clone();
    const monthDays = getDaysOfMonth(clone);
    const daysBefore = getDaysBefore(monthDays[0].date);
    const daysAfter = getDaysAfter(monthDays[monthDays.length - 1].date);

    return [...daysBefore, ...monthDays, ...daysAfter];

    function getDaysOfMonth(currentMonth: Dayjs) {
      const output: Day[] = [];
      const allDays = currentMonth.daysInMonth();

      let count = 1;
      while (count <= allDays) {
        const date = dayjs(new Date(currentMonth.year(), currentMonth.month(), count));
        output.push(new Day(date));
        count++;
      }

      return output;
    }

    function getDaysBefore(firstDay: Dayjs) {
      const output: Day[] = [];
      const dayOfWeek = firstDay.weekday();

      let count = 0;
      while (dayOfWeek !== count) {
        const date = firstDay.subtract(dayOfWeek - count, 'day');
        output.push(new Day(date));
        count++;
      }

      return output;
    }

    function getDaysAfter(lastDay: Dayjs) {
      const output: Day[] = [];
      let dayOfWeek = lastDay.weekday();

      let dayIncrement = 1;
      const count = 6;
      while (dayOfWeek !== count) {
        const date = lastDay.add(dayIncrement++, 'day');
        output.push(new Day(date));
        dayOfWeek++;
      }

      return output;
    }
  }
}
