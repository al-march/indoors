import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@components/navbar';
import { CalendarComponent } from './calendar.component';
import { PopupModule } from '@components/popup';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CreateEventPopupComponent,
  DayComponent,
  HeaderComponent,
  MonthComponent,
  NavigationComponent,
  CalendarEventFormComponent,
  DayEventPopupComponent,
  SearchEventModule
} from './components';

@NgModule({
  declarations: [
    CalendarComponent,
    HeaderComponent,
    MonthComponent,
    DayComponent,
    NavigationComponent,
    CreateEventPopupComponent,
    CalendarEventFormComponent,
    DayEventPopupComponent,
  ],
  exports: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    NavbarComponent,
    PopupModule,
    ReactiveFormsModule,
    SearchEventModule
  ]
})
export class CalendarModule {}
