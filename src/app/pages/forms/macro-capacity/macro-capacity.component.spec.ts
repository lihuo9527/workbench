import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroCapacityComponent } from './macro-capacity.component';

describe('MacroCapacityComponent', () => {
  let component: MacroCapacityComponent;
  let fixture: ComponentFixture<MacroCapacityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MacroCapacityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MacroCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
