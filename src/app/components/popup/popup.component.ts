import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-popup',
  exportAs: 'popup',
  template: `
    <app-portal *ngIf="show">
      <div class="z-10" #el>
        <ng-content></ng-content>
      </div>
    </app-portal>
  `
})
export class PopupComponent {
  @ViewChild('el')
  set content(el: ElementRef<HTMLDivElement>) {
    this.el = el;
  }

  el?: ElementRef<HTMLDivElement>;

  @Input()
  show = false;

  constructor() {}

  open() {
    this.show = true;
  }

  close() {
    this.show = false;
  }
}
