import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalEntryComponent } from './critical-entry.component';

describe('CriticalEntryComponent', () => {
  let component: CriticalEntryComponent;
  let fixture: ComponentFixture<CriticalEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriticalEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticalEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
