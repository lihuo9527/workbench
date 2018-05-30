import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SevenDayComponent } from './seven-day.component';

describe('SevenDayComponent', () => {
  let component: SevenDayComponent;
  let fixture: ComponentFixture<SevenDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SevenDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SevenDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
