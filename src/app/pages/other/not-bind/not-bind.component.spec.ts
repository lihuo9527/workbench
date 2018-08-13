import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotBindComponent } from './not-bind.component';

describe('NotBindComponent', () => {
  let component: NotBindComponent;
  let fixture: ComponentFixture<NotBindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotBindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotBindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
