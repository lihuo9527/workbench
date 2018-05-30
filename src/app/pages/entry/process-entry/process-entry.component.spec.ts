import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessEntryComponent } from './process-entry.component';

describe('ProcessEntryComponent', () => {
  let component: ProcessEntryComponent;
  let fixture: ComponentFixture<ProcessEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
