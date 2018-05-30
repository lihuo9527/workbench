import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessDelayComponent } from './process-delay.component';

describe('ProcessDelayComponent', () => {
  let component: ProcessDelayComponent;
  let fixture: ComponentFixture<ProcessDelayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessDelayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessDelayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
