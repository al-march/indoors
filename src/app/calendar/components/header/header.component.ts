import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppStorage, Theme } from '@storage/storages';
import { CreateEventPopupSubmit } from '@calendar/components/header/create-event-popup/create-event-popup.component';
import { CalendarEvent } from '@calendar/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @Output()
  createEvent = new EventEmitter<CalendarEvent>();

  themes = {
    dark: Theme.DARK,
    light: Theme.LIGHT
  };

  get theme() {
    return this.appStorage.getTheme();
  }

  constructor(
    private appStorage: AppStorage
  ) { }

  ngOnInit(): void {
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
