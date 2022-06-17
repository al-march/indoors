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


@NgModule({
  declarations: [
    CalendarComponent,
    HeaderComponent,
    MonthComponent,
    DayComponent,
    NavigationComponent
  ],
  exports: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    NavbarComponent
  ]
})
export class CalendarModule {}
