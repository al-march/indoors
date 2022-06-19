import { Pipe, PipeTransform } from '@angular/core';
import { CalendarEvent } from '@calendar/models';
import dayjs from 'dayjs';

const format = 'D MMMM';

@Pipe({
  name: 'searchEvent'
})
export class SearchEventPipe implements PipeTransform {

  transform(events: CalendarEvent[] = [], query: string): CalendarEvent[] {
    if (!query) {
      return events;
    }

    const search = query.toLowerCase();

    return events.filter(event => {
      return event.title.toLowerCase().includes(search)
        || event.message?.toLowerCase().includes(search)
        || event.people?.some(man => man.toLowerCase().includes(search))
        || dayjs(event.date).format(format).includes(search)
    });
  }
}
