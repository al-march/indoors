import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CalendarEvent } from '@calendar/models';

@Component({
  selector: 'app-search-event',
  templateUrl: './search-event.component.html',
  styleUrls: ['./search-event.component.css'],
  host: {
    'class': 'w-full'
  }
})
export class SearchEventComponent implements OnInit {

  @Input()
  events: CalendarEvent[] = [];

  @Output()
  check = new EventEmitter<CalendarEvent>();

  searchControl = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

}
