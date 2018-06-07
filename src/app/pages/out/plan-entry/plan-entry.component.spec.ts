import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEntryComponent } from './plan-entry.component';

describe('PlanEntryComponent', () => {
  let component: PlanEntryComponent;
  let fixture: ComponentFixture<PlanEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
