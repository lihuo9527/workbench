import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDelayEditComponent } from './event-delay-edit.component';

describe('EventDalayEditComponent', () => {
  let component: EventDelayEditComponent;
  let fixture: ComponentFixture<EventDelayEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDelayEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDelayEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
