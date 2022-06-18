import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from '@components/portal';

import { PopupDirective } from './popup.directive';
import { PopupComponent } from './popup.component';


@NgModule({
  declarations: [
    PopupDirective,
    PopupComponent
  ],
  imports: [
    CommonModule,
    PortalComponent
  ],
  exports: [
    PopupDirective,
    PopupComponent
  ]
})
export class PopupModule {}
