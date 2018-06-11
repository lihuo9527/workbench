import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnfinishedEntryComponent } from './unfinished-entry.component';

describe('UnfinishedEntryComponent', () => {
  let component: UnfinishedEntryComponent;
  let fixture: ComponentFixture<UnfinishedEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnfinishedEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnfinishedEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
