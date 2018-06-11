import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnansweredEntryComponent } from './unanswered-entry.component';

describe('UnansweredEntryComponent', () => {
  let component: UnansweredEntryComponent;
  let fixture: ComponentFixture<UnansweredEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnansweredEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnansweredEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
