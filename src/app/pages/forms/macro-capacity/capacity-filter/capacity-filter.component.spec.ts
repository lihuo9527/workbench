import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacityFilterComponent } from './capacity-filter.component';

describe('CapacityFilterComponent', () => {
  let component: CapacityFilterComponent;
  let fixture: ComponentFixture<CapacityFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapacityFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacityFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
