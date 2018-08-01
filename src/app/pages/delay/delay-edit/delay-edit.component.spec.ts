import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelayEditComponent } from './delay-edit.component';

describe('DalayEditComponent', () => {
  let component: DelayEditComponent;
  let fixture: ComponentFixture<DelayEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelayEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelayEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
