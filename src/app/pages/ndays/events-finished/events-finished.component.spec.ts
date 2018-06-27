import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsFinishedComponent } from './events-finished.component';

describe('EventsFinishedComponent', () => {
  let component: EventsFinishedComponent;
  let fixture: ComponentFixture<EventsFinishedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsFinishedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
