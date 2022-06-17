import { Component, Input, OnInit } from '@angular/core';
import { Day } from '@calendar/models';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  @Input()
  day?: Day;

  constructor() { }

  ngOnInit() {
  }
}
