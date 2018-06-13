import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyLineEffComponent } from './daily-line-eff.component';

describe('DailyLineEffComponent', () => {
  let component: DailyLineEffComponent;
  let fixture: ComponentFixture<DailyLineEffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyLineEffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyLineEffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
