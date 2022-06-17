import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    CalendarComponent,
    HeaderComponent
  ],
  exports: [
    CalendarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CalendarModule { }
