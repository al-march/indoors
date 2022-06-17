import { Component, Input, OnInit } from '@angular/core';
import dayjs  from 'dayjs';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  @Input()
  day = dayjs();

  constructor() { }

  ngOnInit(): void {
  }

}
