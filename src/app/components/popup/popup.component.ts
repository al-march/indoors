import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-popup',
  exportAs: 'popup',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  constructor(
    private ref: ChangeDetectorRef
  ) {}

  open() {
    this.show = true;
    this.ref.markForCheck();
  }

  close() {
    this.show = false;
    this.ref.markForCheck();
  }
}
