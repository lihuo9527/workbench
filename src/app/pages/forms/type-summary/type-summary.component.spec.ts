import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSummaryComponent } from './type-summary.component';

describe('TypeSummaryComponent', () => {
  let component: TypeSummaryComponent;
  let fixture: ComponentFixture<TypeSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
