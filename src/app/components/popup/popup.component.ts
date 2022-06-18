import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-popup',
  exportAs: 'popup',
  template: `
    <app-portal>
      <div class="z-10" #el>
        <ng-container *ngIf="show">
          <ng-content></ng-content>
        </ng-container>
      </div>
    </app-portal>
  `
})
export class PopupComponent {
  @ViewChild('el')
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
