import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionDailyProgressComponent } from './production-daily-progress.component';

describe('ProductionDailyProgressComponent', () => {
  let component: ProductionDailyProgressComponent;
  let fixture: ComponentFixture<ProductionDailyProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionDailyProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionDailyProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
