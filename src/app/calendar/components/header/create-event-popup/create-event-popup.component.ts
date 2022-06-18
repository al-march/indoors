import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create-event-popup',
  templateUrl: './create-event-popup.component.html',
  styleUrls: ['./create-event-popup.component.css']
})
export class CreateEventPopupComponent implements OnInit {

  @Output()
  close = new EventEmitter();

  constructor(
  ) {

  }

  ngOnInit(): void {
  }
}
