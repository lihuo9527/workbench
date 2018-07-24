import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownUpdateComponent } from './down-update.component';

describe('DownUpdateComponent', () => {
  let component: DownUpdateComponent;
  let fixture: ComponentFixture<DownUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
