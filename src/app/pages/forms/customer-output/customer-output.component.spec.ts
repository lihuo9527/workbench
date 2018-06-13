import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOutputComponent } from './customer-output.component';

describe('CustomerOutputComponent', () => {
  let component: CustomerOutputComponent;
  let fixture: ComponentFixture<CustomerOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
