import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EveryMonthEffComponent } from './every-month-eff.component';

describe('EveryMonthEffComponent', () => {
  let component: EveryMonthEffComponent;
  let fixture: ComponentFixture<EveryMonthEffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EveryMonthEffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EveryMonthEffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
