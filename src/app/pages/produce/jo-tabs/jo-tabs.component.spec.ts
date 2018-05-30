import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoTabsComponent } from './jo-tabs.component';

describe('JoTabsComponent', () => {
  let component: JoTabsComponent;
  let fixture: ComponentFixture<JoTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
