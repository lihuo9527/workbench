import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutProcessComponent } from './out-process.component';

describe('OutProcessComponent', () => {
  let component: OutProcessComponent;
  let fixture: ComponentFixture<OutProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
