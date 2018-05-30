import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverDelayComponent } from './deliver-delay.component';

describe('DeliverDelayComponent', () => {
  let component: DeliverDelayComponent;
  let fixture: ComponentFixture<DeliverDelayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverDelayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverDelayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
