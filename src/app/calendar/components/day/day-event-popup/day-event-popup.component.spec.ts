import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayEventPopupComponent } from './day-event-popup.component';

describe('DayEventPopupComponent', () => {
  let component: DayEventPopupComponent;
  let fixture: ComponentFixture<DayEventPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayEventPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayEventPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
