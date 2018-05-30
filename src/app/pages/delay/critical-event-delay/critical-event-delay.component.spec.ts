import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalEventDelayComponent } from './critical-event-delay.component';

describe('CriticalEventDelayComponent', () => {
  let component: CriticalEventDelayComponent;
  let fixture: ComponentFixture<CriticalEventDelayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriticalEventDelayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticalEventDelayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
