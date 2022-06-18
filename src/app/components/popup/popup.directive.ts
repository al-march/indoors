import { Directive, ElementRef, EventEmitter, HostListener, Input, NgZone, OnChanges, Output } from '@angular/core';
import { PopupComponent } from '@components/popup/popup.component';
import { createPopper, Instance, Placement } from '@popperjs/core';

@Directive({
  selector: '[appPopup]',
})
export class PopupDirective implements OnChanges {

  @Input()
  appPopup?: PopupComponent;

  @Input()
  placement: Placement = 'bottom';

  @Input()
  offset: number[] = [0, 0];

  @Input()
  closeOnOutsideClick = true;

  @Input()
  closeOnInsideClick = true;

  @Output()
  outsideClick = new EventEmitter();

  @Output()
  insideClick = new EventEmitter();

  instance?: Instance;

  constructor(
    private el: ElementRef<HTMLElement>,
    private zone: NgZone
  ) { }

  ngOnChanges() {
  }

  toggle() {
    if (this.appPopup) {
      this.appPopup.show
        ? this.close()
        : this.open();
    }
  }

  open() {
    if (this.appPopup) {
      this.appPopup.show = true;
      this.instance?.destroy();
      this.createPopper();
    }
  }

  close() {
    if (this.appPopup) {
      this.appPopup.show = false;
      this.instance?.destroy();
    }
  }

  @HostListener('window:click', ['$event'])
  onDocumentClick(event: PointerEvent) {
    const target = event.target;
    const trigger = this.el.nativeElement;

    if (target instanceof HTMLElement) {
      if (trigger.contains(target)) {
        this.onTriggerClick();
        return;
      }

      const content = this.appPopup?.el?.nativeElement;
      if (content?.contains(target)) {
        this.onInsideClick();
      } else {
        this.onOutsideClick();
      }
    }
  }

  onTriggerClick() {
    this.toggle();
  }

  onInsideClick() {
    this.insideClick.emit();
    if (this.closeOnOutsideClick) {
      this.close();
    }
  }

  onOutsideClick() {
    this.outsideClick.emit();
    if (this.closeOnOutsideClick) {
      this.close();
    }
  }

  private createPopper() {
    this.instance?.destroy();

    const reference = this.el.nativeElement;
    const popper = this.appPopup?.el?.nativeElement;
    if (reference && popper) {
      this.zone.runOutsideAngular(() => {
        this.instance = createPopper(reference, popper, {
          placement: this.placement,
          modifiers: [{
            name: 'offset',
            options: {
              offset: this.offset,
            },
          }]
        });
      });
    }
  }
}
