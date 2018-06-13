import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCycleSummaryComponent } from './order-cycle-summary.component';

describe('OrderCycleSummaryComponent', () => {
  let component: OrderCycleSummaryComponent;
  let fixture: ComponentFixture<OrderCycleSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCycleSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCycleSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
