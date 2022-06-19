import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import dayjs from 'dayjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {

  @Input()
  month = dayjs();

  @Output()
  prev = new EventEmitter();

  @Output()
  next = new EventEmitter();

  @Output()
  today = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
