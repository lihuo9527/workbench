import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectingSuppliersComponent } from './selecting-suppliers.component';

describe('SelectingSuppliersComponent', () => {
  let component: SelectingSuppliersComponent;
  let fixture: ComponentFixture<SelectingSuppliersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectingSuppliersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectingSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
