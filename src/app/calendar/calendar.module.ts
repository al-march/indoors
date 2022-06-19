import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@components/navbar';
import { CalendarComponent } from './calendar.component';
import {
  DayComponent,
  HeaderComponent,
  MonthComponent,
  NavigationComponent
} from './components';
import { PopupModule } from '@components/popup';
import { CreateEventPopupComponent } from '@calendar/components/header/create-event-popup/create-event-popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarEventFormComponent } from './components/calendar-event-form/calendar-event-form.component';
import { DayEventPopupComponent } from './components/day/day-event-popup/day-event-popup.component';


@NgModule({
  declarations: [
    CalendarComponent,
    HeaderComponent,
    MonthComponent,
    DayComponent,
    NavigationComponent,
    CreateEventPopupComponent,
    CalendarEventFormComponent,
    DayEventPopupComponent
  ],
  exports: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    NavbarComponent,
    PopupModule,
    ReactiveFormsModule
  ]
})
export class CalendarModule {}
