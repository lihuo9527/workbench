import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NdaysComponent } from './ndays.component';

describe('NdaysComponent', () => {
  let component: NdaysComponent;
  let fixture: ComponentFixture<NdaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NdaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NdaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
