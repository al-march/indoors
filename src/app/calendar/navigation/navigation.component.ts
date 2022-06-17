import { Component, Input, OnInit } from '@angular/core';
import dayjs from 'dayjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Input()
  month = dayjs();

  constructor() { }

  ngOnInit(): void {
  }

}
