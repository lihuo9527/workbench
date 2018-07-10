import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacityFigureComponent } from './capacity-figure.component';

describe('CapacityFigureComponent', () => {
  let component: CapacityFigureComponent;
  let fixture: ComponentFixture<CapacityFigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapacityFigureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacityFigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
