import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoListComponent } from './jo-list.component';

describe('JoListComponent', () => {
  let component: JoListComponent;
  let fixture: ComponentFixture<JoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
