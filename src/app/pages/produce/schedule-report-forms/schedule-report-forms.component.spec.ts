import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleReportFormsComponent } from './schedule-report-forms.component';

describe('ScheduleReportFormsComponent', () => {
  let component: ScheduleReportFormsComponent;
  let fixture: ComponentFixture<ScheduleReportFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleReportFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleReportFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
