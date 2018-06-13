import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheMonthEffComponent } from './the-month-eff.component';

describe('TheMonthEffComponent', () => {
  let component: TheMonthEffComponent;
  let fixture: ComponentFixture<TheMonthEffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheMonthEffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheMonthEffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
