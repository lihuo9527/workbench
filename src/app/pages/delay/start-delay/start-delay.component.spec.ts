import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartDelayComponent } from './start-delay.component';

describe('StartDelayComponent', () => {
  let component: StartDelayComponent;
  let fixture: ComponentFixture<StartDelayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartDelayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartDelayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
