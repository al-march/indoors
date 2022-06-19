import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { AppStorage, Theme } from '@storage/storages';
import { CreateEventPopupSubmit } from '@calendar/components';
import { CalendarEvent } from '@calendar/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnChanges {

  @Input()
  events: Record<number, CalendarEvent[]> = {};

  @Output()
  createEvent = new EventEmitter<CalendarEvent>();

  themes = {
    dark: Theme.DARK,
    light: Theme.LIGHT
  };

  get theme() {
    return this.appStorage.getTheme();
  }

  eventsAsArray: CalendarEvent[] = [];

  constructor(
    private appStorage: AppStorage
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['events']) {
      this.eventsAsArray = Object.values(this.events).flat();
    }
  }

  setTheme(theme: Theme) {
    this.appStorage.setTheme(theme);
  }

  onCreateEvent(data: CreateEventPopupSubmit) {
    const event: CalendarEvent = {
      date: +data.date.toDate(),
      title: data.message,
    };
    this.createEvent.emit(event);
  }
}
