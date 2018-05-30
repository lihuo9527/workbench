import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonPlaningProcessComponent } from './non-planing-process.component';

describe('NonPlaningProcessComponent', () => {
  let component: NonPlaningProcessComponent;
  let fixture: ComponentFixture<NonPlaningProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonPlaningProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonPlaningProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
