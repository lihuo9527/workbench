import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalEventComponent } from './critical-event.component';

describe('CriticalEventComponent', () => {
  let component: CriticalEventComponent;
  let fixture: ComponentFixture<CriticalEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriticalEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticalEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
