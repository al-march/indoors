import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { HeaderComponent } from './header/header.component';
import { MonthComponent } from './month/month.component';
import { DayComponent } from './day/day.component';
import { NavigationComponent } from './navigation/navigation.component';



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
    CommonModule
  ]
})
export class CalendarModule { }
