import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EveryMonthQtyComponent } from './every-month-qty.component';

describe('EveryMonthQtyComponent', () => {
  let component: EveryMonthQtyComponent;
  let fixture: ComponentFixture<EveryMonthQtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EveryMonthQtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EveryMonthQtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
