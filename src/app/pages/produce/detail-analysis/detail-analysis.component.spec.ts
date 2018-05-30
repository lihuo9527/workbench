import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAnalysisComponent } from './detail-analysis.component';

describe('DetailAnalysisComponent', () => {
  let component: DetailAnalysisComponent;
  let fixture: ComponentFixture<DetailAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
