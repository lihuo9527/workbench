import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCycleProductionComponent } from './order-cycle-production.component';

describe('OrderCycleProductionComponent', () => {
  let component: OrderCycleProductionComponent;
  let fixture: ComponentFixture<OrderCycleProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCycleProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCycleProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
