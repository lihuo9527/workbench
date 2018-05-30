import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDelayComponent } from './material-delay.component';

describe('MaterialDelayComponent', () => {
  let component: MaterialDelayComponent;
  let fixture: ComponentFixture<MaterialDelayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialDelayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialDelayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
