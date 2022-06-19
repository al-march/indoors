import { Component, Input } from '@angular/core';
import { CalendarEvent } from '@calendar/models';
import dayjs from 'dayjs';

@Component({
  selector: 'app-search-item',
  template: `
    <button *ngIf="event" class="btn btn-ghost w-full flex flex-col rounded-none normal-case h-auto">
      <span class="flex flex-col font-normal w-full text-left">
        <span class="truncate">{{event.title}}</span>
        <span class="truncate text-2xs">{{event.people}}</span>
        <span class="text-xs opacity-75">{{formatDate(event.date)}}</span>
      </span>
    </button>
  `
})
export class SearchItemComponent {
  @Input()
  event?: CalendarEvent;

  @Input()
  notFound = false;

  formatDate(date: number) {
    return dayjs(date).format('D MMMM');
  }
}
