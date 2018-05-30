import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultComparisonComponent } from './result-comparison.component';

describe('ResultComparisonComponent', () => {
  let component: ResultComparisonComponent;
  let fixture: ComponentFixture<ResultComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultComparisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
