import {
  AfterViewInit,
  ApplicationRef,
  Component,
  EmbeddedViewRef,
  Inject,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class PortalComponent implements OnInit, AfterViewInit {

  @ViewChild(TemplateRef)
  portalContent?: TemplateRef<HTMLElement>;

  private embeddedViewRef?: EmbeddedViewRef<HTMLElement>;
  private portalContentRef?: HTMLElement;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private applicationRef: ApplicationRef,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit() {
    console.log('portal init', this.portalContent);
    const template = this.portalContent;
    if (template) {
      console.log('template');
      this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(template);
      this.portalContentRef = this.embeddedViewRef.rootNodes[0];
      this.renderer.appendChild(this.document.body, this.portalContentRef);
    }
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    if (this.portalContentRef) {
      this.portalContentRef.remove();
    }

    if (this.embeddedViewRef) {
      this.embeddedViewRef.destroy();
    }
  }
}
