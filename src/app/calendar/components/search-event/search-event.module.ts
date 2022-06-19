import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchItemComponent } from './search-item.component';
import { SearchEventComponent } from './search-event.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PopupModule } from '@components/popup';
import { SearchEventPipe } from './search-event.pipe';


@NgModule({
  declarations: [
    SearchItemComponent,
    SearchEventComponent,
    SearchEventPipe
  ],
  exports: [
    SearchItemComponent,
    SearchEventComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PopupModule
  ]
})
export class SearchEventModule {}
